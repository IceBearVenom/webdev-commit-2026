export type Difficulty = 'Sangat mudah' | 'Mudah' | 'Menengah';

export interface IngredientItem {
  name: string;
  quantity: number;
  unit: string;
  estimatedCost: number; // Biaya bahan yang digunakan saja
  packagePrice?: number; // Biaya pembelian kemasan di pasar
  packageSize?: string; // e.g. "1 papan", "1 bungkus (500g)"
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  cookingTime: number; // minutes
  difficulty: Difficulty;
  portion: string; // e.g., "1-2 porsi"
  equipment: string[];
  ingredients: IngredientItem[];
  instructions: string[];
  estimatedCost: number; // Total biaya memasak (bahan terpakai)
  outsidePrice: number; // Perkiraan harga beli makanan serupa di warung Yogyakarta
  savings: number; // outsidePrice - estimatedCost
}

export interface Equipment {
  id: string;
  name: string;
  category: 'Cookware' | 'Utensils' | 'Electronics' | 'Storage';
  icon: string;
  description: string;
}

export interface MarketIngredient {
  id: string;
  name: string;
  unit: string;
  averagePriceYogya: number; // Harga per unit di Yogyakarta
  category: string;
  lastUpdated: string;
}

export interface UserIngredientInput {
  name: string;
  quantity: number;
  unit: string;
}

export interface MealPlanConfig {
  equipment: string[];
  ingredients: UserIngredientInput[];
  days: number; // 1 - 7
  mealsPerDay: number; // 1 - 3
  budget: number; // total budget IDR
}

export interface PlanMealSlot {
  day: number; // 1 to days
  mealNumber: number; // 1 to mealsPerDay
  mealLabel: string; // e.g. "Makan Pagi", "Makan Siang", "Makan Malam" or "Resep 1"
  recipe: Recipe;
}

export interface ShoppingItem {
  name: string;
  quantity: number;
  unit: string;
  estimatedCost: number; // Biaya pemakaian
  packagePrice: number; // Biaya beli kemasan
  isOwned: boolean;
}

export interface BudgetOptimizationSuggestion {
  type: 'substitute' | 'reuse' | 'portion' | 'swap_recipe';
  title: string;
  description: string;
  savingsAmount: number;
  applied?: boolean;
}

export interface MealPlan {
  id: string;
  name: string;
  createdAt: string;
  config: MealPlanConfig;
  slots: PlanMealSlot[];
  totalEstimatedCost: number; // Biaya bahan terpakai
  totalShoppingCost: number; // Total estimasi uang belanja kemasan
  totalOutsideCost: number; // Total jika beli makanan di luar
  totalSavings: number; // Total penghematan
  shoppingList: ShoppingItem[];
  ownedIngredientsUsed: string[];
}
