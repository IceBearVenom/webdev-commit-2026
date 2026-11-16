import { YOGYA_PRICE_DB } from '../data/priceDb';
import { RECIPES_DB } from '../data/recipes';
import type {
  AvailableUsedItem,
  Ingredient,
  MealPlanEvaluation,
  Recipe,
  RecipeMetrics,
  ScoredRecipe,
  ToBuyItem,
} from '../types';

/** Actual used cost per recipe based on the Yogyakarta price DB. */
export function calculateRecipeMetrics(recipe: Recipe): RecipeMetrics {
  let totalCookCost = 0;
  const detailedIngredients = recipe.ingredients.map((item) => {
    const dbRef = YOGYA_PRICE_DB[item.name];
    const unitPrice = dbRef ? dbRef.pricePerUnit : 1000;
    const itemCost = Math.round(item.qty * unitPrice);
    totalCookCost += itemCost;
    return { ...item, estimatedCost: itemCost };
  });

  return {
    ...recipe,
    detailedIngredients,
    cookCost: totalCookCost,
    savings: Math.max(0, recipe.outsidePrice - totalCookCost),
  };
}

/** Full meal plan evaluation: used cost vs. shopping outlay. */
export function evaluateMealPlanFinancials(
  selectedRecipes: Recipe[],
  userIngredients: Ingredient[],
  totalBudget: number,
): MealPlanEvaluation {
  let totalUsedCost = 0;
  let totalOutsideCost = 0;
  const totalNeededMap: Record<string, { qty: number; unit: string }> = {};

  selectedRecipes.forEach((rec) => {
    const metrics = calculateRecipeMetrics(rec);
    totalUsedCost += metrics.cookCost;
    totalOutsideCost += metrics.outsidePrice;

    rec.ingredients.forEach((ing) => {
      if (!totalNeededMap[ing.name]) {
        totalNeededMap[ing.name] = { qty: 0, unit: ing.unit };
      }
      totalNeededMap[ing.name].qty += ing.qty;
    });
  });

  const ownedMap: Record<string, number> = {};
  userIngredients.forEach((u) => {
    ownedMap[u.name] = (ownedMap[u.name] || 0) + Number(u.qty);
  });

  const toBuyList: ToBuyItem[] = [];
  const availableUsedList: AvailableUsedItem[] = [];
  let estimatedShoppingOutlay = 0;

  Object.keys(totalNeededMap).forEach((name) => {
    const needed = totalNeededMap[name];
    const ownedQty = ownedMap[name] || 0;
    const dbRef = YOGYA_PRICE_DB[name];

    if (ownedQty > 0) {
      const usedFromOwned = Math.min(needed.qty, ownedQty);
      availableUsedList.push({
        name,
        qty: Number(usedFromOwned.toFixed(1)),
        unit: needed.unit,
      });
    }

    const deficit = needed.qty - ownedQty;
    if (deficit > 0) {
      const packsNeeded = dbRef ? Math.ceil(deficit / dbRef.marketPackQty) : 1;
      const shopPrice = dbRef ? packsNeeded * dbRef.marketPackPrice : 5000;
      estimatedShoppingOutlay += shopPrice;

      toBuyList.push({
        name,
        deficitQty: Number(deficit.toFixed(1)),
        unit: needed.unit,
        packSuggestion: dbRef ? `${packsNeeded}x (${dbRef.packLabel})` : `${deficit} ${needed.unit}`,
        estimatedShopPrice: shopPrice,
      });
    }
  });

  return {
    totalUsedCost,
    totalOutsideCost,
    totalSavings: Math.max(0, totalOutsideCost - totalUsedCost),
    remainingBudget: totalBudget - totalUsedCost,
    estimatedShoppingOutlay,
    toBuyList,
    availableUsedList,
    isOverBudget: totalUsedCost > totalBudget,
  };
}

/** Filter by equipment, score by ingredient overlap & low cost, and build a swipe deck. */
export function buildCandidateDeck(
  equipment: string[],
  userIngredients: Ingredient[],
  targetCount: number,
): { deck: ScoredRecipe[]; usedFallback: boolean } {
  const ownedNames = userIngredients.map((i) => i.name.toLowerCase());

  let compatible = RECIPES_DB.filter((rec) => rec.equipment.every((req) => equipment.includes(req)));
  let usedFallback = false;
  if (compatible.length < 3) {
    compatible = [...RECIPES_DB];
    usedFallback = true;
  }

  const scored: ScoredRecipe[] = compatible
    .map((rec) => {
      const metrics = calculateRecipeMetrics(rec);
      const overlapCount = rec.ingredients.filter((ing) => ownedNames.includes(ing.name.toLowerCase())).length;
      return { ...metrics, score: overlapCount * 5000 - metrics.cookCost };
    })
    .sort((a, b) => b.score - a.score);

  let deck = [...scored];
  while (deck.length < targetCount + 6) {
    deck = deck.concat(scored);
  }
  return { deck, usedFallback };
}

/** All recipes with metrics, cheapest first. */
export function getEconomicalPool(excludeId?: string): RecipeMetrics[] {
  return RECIPES_DB.map(calculateRecipeMetrics)
    .filter((r) => r.id !== excludeId)
    .sort((a, b) => a.cookCost - b.cookCost);
}
