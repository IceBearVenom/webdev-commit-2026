export type View = 'home' | 'planner' | 'saved-detail';
export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export interface Ingredient {
  name: string;
  qty: number;
  unit: string;
}

export interface PriceEntry {
  unit: string;
  pricePerUnit: number;
  marketPackQty: number;
  marketPackPrice: number;
  packLabel: string;
}

export interface EquipmentOption {
  id: string;
  label: string;
  icon: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  cookingTime: number;
  outsidePrice: number;
  image: string;
  description: string;
  equipment: string[];
  ingredients: Ingredient[];
  instructions: string[];
}

export interface DetailedIngredient extends Ingredient {
  estimatedCost: number;
}

export interface RecipeMetrics extends Recipe {
  detailedIngredients: DetailedIngredient[];
  cookCost: number;
  savings: number;
}

export interface ScoredRecipe extends RecipeMetrics {
  score: number;
}

export interface ToBuyItem {
  name: string;
  deficitQty: number;
  unit: string;
  packSuggestion: string;
  estimatedShopPrice: number;
}

export interface AvailableUsedItem {
  name: string;
  qty: number;
  unit: string;
}

export interface MealPlanEvaluation {
  totalUsedCost: number;
  totalOutsideCost: number;
  totalSavings: number;
  remainingBudget: number;
  estimatedShoppingOutlay: number;
  toBuyList: ToBuyItem[];
  availableUsedList: AvailableUsedItem[];
  isOverBudget: boolean;
}

export interface SavedMealPlan {
  id: string;
  title: string;
  createdAt: string;
  durationDays: number;
  frequencyPerDay: number;
  totalBudget: number;
  totalUsedCost: number;
  totalSavings: number;
  schedule: Recipe[][];
}

export interface PlannerState {
  step: number;
  equipment: string[];
  userIngredients: Ingredient[];
  durationDays: number;
  frequencyPerDay: number;
  totalBudget: number;
  candidateRecipes: ScoredRecipe[];
  currentSwipeIndex: number;
  selectedRecipes: Recipe[];
  generatedSchedule: Recipe[][];
  isGenerating: boolean;
}

export interface HeroSlide {
  word: string;
  kicker: string;
  titleLines: [string, string];
  metaBefore: string;
  metaAfter: string;
  image: string;
  recipeId: string;
  tabLabel: string;
}
