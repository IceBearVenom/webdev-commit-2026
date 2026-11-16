import React, { useState } from 'react';
import { MealPlanConfig, Recipe, UserIngredientInput, MealPlan } from '../../types';
import { generateCandidateRecipes, buildMealPlanResult } from '../../services/mealPlannerEngine';
import { Step1KitchenInventory } from './Step1KitchenInventory';
import { Step2Duration } from './Step2Duration';
import { Step3Budget } from './Step3Budget';
import { Step4SwipeCards } from './Step4SwipeCards';
import { Step5BudgetOptimization } from './Step5BudgetOptimization';
import { Step6Summary } from './Step6Summary';
import { Step7ResultGrid } from './Step7ResultGrid';
import { RecipeDetailModal } from '../RecipeDetailModal';

interface WizardProps {
  onPlanFinishedAndSaved: () => void;
}

export const MealPlannerWizard: React.FC<WizardProps> = ({ onPlanFinishedAndSaved }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Configuration State
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([
    'Rice Cooker',
    'Kompor',
    'Wajan / Kuali',
    'Pisau Dapur',
    'Talenan',
    'Sutil / Spatula'
  ]);
  const [ingredients, setIngredients] = useState<UserIngredientInput[]>([
    { name: 'Beras', quantity: 1, unit: 'kg' },
    { name: 'Telur', quantity: 4, unit: 'butir' },
    { name: 'Tempe', quantity: 1, unit: 'papan' }
  ]);

  const [days, setDays] = useState<number>(3);
  const [mealsPerDay, setMealsPerDay] = useState<number>(2);
  const [budget, setBudget] = useState<number>(100000);

  // Recipe Candidate & Selections State
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  const [modalRecipe, setModalRecipe] = useState<Recipe | null>(null);

  const config: MealPlanConfig = {
    equipment: selectedEquipment,
    ingredients,
    days,
    mealsPerDay,
    budget
  };

  // Generate candidate recipes when moving to Step 4
  const candidates = generateCandidateRecipes(config);

  const handleNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 7));
  const handlePrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6">
      {/* Wizard Step Progress Tracker */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
          <span>Langkah {currentStep} dari 7</span>
          <span className="text-emerald-600">
            {currentStep === 1 && 'Inventaris Dapur'}
            {currentStep === 2 && 'Durasi Perencanaan'}
            {currentStep === 3 && 'Konfigurasi Budget'}
            {currentStep === 4 && 'AI Recipe & Swipe'}
            {currentStep === 5 && 'Budget Optimization'}
            {currentStep === 6 && 'Ringkasan Rencana'}
            {currentStep === 7 && 'Hasil Meal Plan Harian'}
          </span>
        </div>

        <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <div
              key={s}
              className={`h-full flex-1 transition-all duration-300 ${
                s <= currentStep ? 'bg-emerald-600' : 'bg-slate-200'
              } ${s < currentStep ? 'border-r border-emerald-500' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Step Render */}
      {currentStep === 1 && (
        <Step1KitchenInventory
          selectedEquipment={selectedEquipment}
          setSelectedEquipment={setSelectedEquipment}
          ingredients={ingredients}
          setIngredients={setIngredients}
          onNext={handleNextStep}
        />
      )}

      {currentStep === 2 && (
        <Step2Duration
          days={days}
          setDays={setDays}
          mealsPerDay={mealsPerDay}
          setMealsPerDay={setMealsPerDay}
          onNext={handleNextStep}
          onBack={handlePrevStep}
        />
      )}

      {currentStep === 3 && (
        <Step3Budget
          budget={budget}
          setBudget={setBudget}
          days={days}
          mealsPerDay={mealsPerDay}
          onNext={handleNextStep}
          onBack={handlePrevStep}
        />
      )}

      {currentStep === 4 && (
        <Step4SwipeCards
          candidates={candidates}
          config={config}
          selectedRecipes={selectedRecipes}
          setSelectedRecipes={setSelectedRecipes}
          onNext={handleNextStep}
          onBack={handlePrevStep}
          onOpenRecipeDetail={(r) => setModalRecipe(r)}
        />
      )}

      {currentStep === 5 && (
        <Step5BudgetOptimization
          selectedRecipes={selectedRecipes}
          config={config}
          onNext={handleNextStep}
          onBack={handlePrevStep}
        />
      )}

      {currentStep === 6 && (
        <Step6Summary
          selectedRecipes={selectedRecipes}
          config={config}
          onConfirm={handleNextStep}
          onBack={handlePrevStep}
        />
      )}

      {currentStep === 7 && (
        <Step7ResultGrid
          mealPlan={buildMealPlanResult(selectedRecipes, config)}
          onPlanSaved={onPlanFinishedAndSaved}
        />
      )}

      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        recipe={modalRecipe}
        onClose={() => setModalRecipe(null)}
      />
    </div>
  );
};
