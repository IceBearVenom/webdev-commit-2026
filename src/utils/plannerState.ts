import type { PlannerState } from '../types';

export function createInitialPlannerState(): PlannerState {
  return {
    step: 1,
    equipment: ['Rice cooker', 'Kompor', 'Wajan', 'Pisau'],
    userIngredients: [
      { name: 'Beras', qty: 500, unit: 'gram' },
      { name: 'Minyak Goreng', qty: 200, unit: 'ml' },
    ],
    durationDays: 3,
    frequencyPerDay: 2,
    totalBudget: 75000,
    candidateRecipes: [],
    currentSwipeIndex: 0,
    selectedRecipes: [],
    generatedSchedule: [],
    isGenerating: false,
  };
}
