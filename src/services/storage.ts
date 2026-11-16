import { MealPlan } from '../types';

const STORAGE_KEY = 'dapurkos_meal_plans_v1';

export const saveMealPlanToStorage = (plan: MealPlan): boolean => {
  try {
    const existing = getSavedMealPlans();
    // Filter out if already exists with same ID to update
    const updated = [plan, ...existing.filter((p) => p.id !== plan.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Gagal menyimpan meal plan ke localStorage:', error);
    return false;
  }
};

export const getSavedMealPlans = (): MealPlan[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as MealPlan[];
  } catch (error) {
    console.error('Gagal membaca meal plan dari localStorage:', error);
    return [];
  }
};

export const deleteMealPlanFromStorage = (id: string): MealPlan[] => {
  try {
    const existing = getSavedMealPlans();
    const filtered = existing.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (error) {
    console.error('Gagal menghapus meal plan dari localStorage:', error);
    return getSavedMealPlans();
  }
};
