import { RECIPES_DATA } from '../data/recipes';
import { YOGYAKARTA_MARKET_PRICES } from '../data/marketPrices';
import {
  MealPlanConfig,
  Recipe,
  PlanMealSlot,
  ShoppingItem,
  MealPlan,
  BudgetOptimizationSuggestion
} from '../types';

/**
 * Filter recipes compatible with user's available equipment.
 * If user has no specific equipment selected, assume basic kitchen tools.
 */
export const filterRecipesByEquipment = (
  recipes: Recipe[],
  userEquipmentNames: string[]
): Recipe[] => {
  if (!userEquipmentNames || userEquipmentNames.length === 0) return recipes;

  const normalizedUserEquip = userEquipmentNames.map((e) => e.toLowerCase());

  return recipes.filter((recipe) => {
    // Check if recipe needs equipment that user does NOT have
    return recipe.equipment.every((reqEq) => {
      const lowerReq = reqEq.toLowerCase();
      // Allow flexible matching (e.g. Wajan, Kompor, Panci, Spatula, Pisau)
      return normalizedUserEquip.some(
        (ue) => lowerReq.includes(ue) || ue.includes(lowerReq) || ue.includes('kompor') || ue.includes('wajan')
      );
    });
  });
};

/**
 * Calculate match score for a recipe based on available user ingredients.
 */
export const calculateRecipeMatchScore = (
  recipe: Recipe,
  userIngredients: { name: string }[]
): number => {
  if (!userIngredients || userIngredients.length === 0) return 0;
  const userIngNames = userIngredients.map((i) => i.name.toLowerCase());
  let matches = 0;

  recipe.ingredients.forEach((ing) => {
    const ingName = ing.name.toLowerCase();
    if (userIngNames.some((ui) => ingName.includes(ui) || ui.includes(ingName))) {
      matches += 1;
    }
  });

  return matches;
};

/**
 * Generate candidate recipe recommendations tailored to configuration
 */
export const generateCandidateRecipes = (config: MealPlanConfig): Recipe[] => {
  const equipmentFiltered = filterRecipesByEquipment(RECIPES_DATA, config.equipment);
  const pool = equipmentFiltered.length > 0 ? equipmentFiltered : RECIPES_DATA;

  // Sort pool by match score with user's available ingredients, then by budget efficiency
  return [...pool].sort((a, b) => {
    const scoreA = calculateRecipeMatchScore(a, config.ingredients);
    const scoreB = calculateRecipeMatchScore(b, config.ingredients);
    if (scoreB !== scoreA) return scoreB - scoreA;
    return a.estimatedCost - b.estimatedCost;
  });
};

/**
 * Evaluate Budget Optimization Suggestions (PRD 15.1, 15.2, 15.3)
 */
export const evaluateBudgetOptimization = (
  selectedRecipes: Recipe[],
  config: MealPlanConfig
): {
  totalEstimatedCost: number;
  totalShoppingCost: number;
  isOverBudget: boolean;
  suggestions: BudgetOptimizationSuggestion[];
} => {
  const totalSlots = config.days * config.mealsPerDay;
  const totalEstimatedCost = selectedRecipes.reduce((sum, r) => sum + r.estimatedCost, 0);

  // Calculate shopping package cost
  const shoppingItemsMap = new Map<string, { usedCost: number; packagePrice: number }>();
  selectedRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) => {
      const prev = shoppingItemsMap.get(ing.name) || { usedCost: 0, packagePrice: ing.packagePrice || ing.estimatedCost };
      shoppingItemsMap.set(ing.name, {
        usedCost: prev.usedCost + ing.estimatedCost,
        packagePrice: prev.packagePrice
      });
    });
  });

  const totalShoppingCost = Array.from(shoppingItemsMap.values()).reduce((sum, item) => sum + item.packagePrice, 0);
  const isOverBudget = totalEstimatedCost > config.budget;

  const suggestions: BudgetOptimizationSuggestion[] = [];

  if (isOverBudget) {
    const excess = totalEstimatedCost - config.budget;
    suggestions.push({
      type: 'swap_recipe',
      title: 'Ganti menu berbiaya tinggi',
      description: `Total estimasi (Rp${totalEstimatedCost.toLocaleString('id-ID')}) melebihi budget Rp${config.budget.toLocaleString('id-ID')}. Pertimbangkan mengganti menu daging dengan telur/tahu.`,
      savingsAmount: Math.min(excess, 8000)
    });

    suggestions.push({
      type: 'reuse',
      title: 'Optimasi penggunaan bahan bersama (Tempe & Telur)',
      description: 'Gunakan 1 papan tempe & 1 tray telur untuk beberapa menu sekaligus untuk menghemat belanja awal.',
      savingsAmount: 12000
    });
  } else {
    suggestions.push({
      type: 'reuse',
      title: 'Optimasi Bahan Masakan Kos (Zero Food Waste)',
      description: 'Menu yang Anda pilih memanfaatkan kembali bumbu dasar dan protein (telur/tempe) secara optimal.',
      savingsAmount: 5000
    });
  }

  return {
    totalEstimatedCost,
    totalShoppingCost,
    isOverBudget,
    suggestions
  };
};

/**
 * Generate complete MealPlan object from selected recipes and config
 */
export const buildMealPlanResult = (
  selectedRecipes: Recipe[],
  config: MealPlanConfig
): MealPlan => {
  const totalSlots = config.days * config.mealsPerDay;
  const slots: PlanMealSlot[] = [];

  let recipeIndex = 0;
  for (let d = 1; d <= config.days; d++) {
    for (let m = 1; m <= config.mealsPerDay; m++) {
      const recipe = selectedRecipes[recipeIndex % selectedRecipes.length];
      let mealLabel = `Resep ${m}`;
      if (config.mealsPerDay === 1) mealLabel = 'Makan Utama';
      else if (config.mealsPerDay === 2) mealLabel = m === 1 ? 'Makan Siang' : 'Makan Malam';
      else if (config.mealsPerDay === 3) mealLabel = m === 1 ? 'Makan Pagi' : m === 2 ? 'Makan Siang' : 'Makan Malam';

      slots.push({
        day: d,
        mealNumber: m,
        mealLabel,
        recipe
      });
      recipeIndex++;
    }
  }

  // Aggregate Shopping List & Ingredients
  const shoppingMap = new Map<string, ShoppingItem>();
  const userIngNames = config.ingredients.map((i) => i.name.toLowerCase());

  slots.forEach((slot) => {
    slot.recipe.ingredients.forEach((ing) => {
      const isOwned = userIngNames.some((ui) => ing.name.toLowerCase().includes(ui) || ui.includes(ing.name.toLowerCase()));
      const existing = shoppingMap.get(ing.name);

      if (existing) {
        existing.quantity += ing.quantity;
        existing.estimatedCost += ing.estimatedCost;
      } else {
        shoppingMap.set(ing.name, {
          name: ing.name,
          quantity: ing.quantity,
          unit: ing.unit,
          estimatedCost: ing.estimatedCost,
          packagePrice: ing.packagePrice || ing.estimatedCost,
          isOwned
        });
      }
    });
  });

  const shoppingList = Array.from(shoppingMap.values());
  const totalEstimatedCost = slots.reduce((sum, s) => sum + s.recipe.estimatedCost, 0);
  const totalShoppingCost = shoppingList.filter((i) => !i.isOwned).reduce((sum, i) => sum + i.packagePrice, 0);
  const totalOutsideCost = slots.reduce((sum, s) => sum + s.recipe.outsidePrice, 0);
  const totalSavings = totalOutsideCost - totalEstimatedCost;

  const ownedIngredientsUsed = shoppingList.filter((i) => i.isOwned).map((i) => i.name);

  const planId = `mp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const dateStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return {
    id: planId,
    name: `Rencana Masak ${config.days} Hari (${dateStr})`,
    createdAt: dateStr,
    config,
    slots,
    totalEstimatedCost,
    totalShoppingCost,
    totalOutsideCost,
    totalSavings,
    shoppingList,
    ownedIngredientsUsed
  };
};
