import { useCallback, useEffect, useRef, type Dispatch, type SetStateAction } from 'react';
import type { PlannerState, ToastType } from '../../types';
import { buildCandidateDeck } from '../../utils/calculations';
import { buildSchedule } from '../../utils/schedule';
import { Stepper } from './Stepper';
import { Step1Inventory } from './Step1Inventory';
import { Step2Duration } from './Step2Duration';
import { Step3Budget } from './Step3Budget';
import { Step4Swipe } from './Step4Swipe';
import { Step5Optimization } from './Step5Optimization';
import { Step6Summary } from './Step6Summary';
import { Step7Schedule } from './Step7Schedule';

interface PlannerProps {
  planner: PlannerState;
  setPlanner: Dispatch<SetStateAction<PlannerState>>;
  showToast: (message: string, type?: ToastType) => void;
  onOpenRecipe: (recipeId: string) => void;
  onCancel: () => void;
  onSavePlan: () => void;
}

export function Planner({ planner, setPlanner, showToast, onOpenRecipe, onCancel, onSavePlan }: PlannerProps) {
  const timerRef = useRef<number>();

  const update = useCallback(
    (patch: Partial<PlannerState>) => setPlanner((prev) => ({ ...prev, ...patch })),
    [setPlanner],
  );

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [planner.step]);

  const goToStep = (step: number) => {
    if (step === 2 && planner.equipment.length === 0) {
      showToast('Pilih minimal 1 peralatan masak yang kamu miliki di kos.', 'warning');
      return;
    }
    update({ step });
  };

  const generateAIRecipes = () => {
    if (!planner.totalBudget || planner.totalBudget < 5000) {
      showToast('Masukkan total budget minimal Rp 5.000.', 'warning');
      return;
    }

    const { equipment, userIngredients, durationDays, frequencyPerDay } = planner;
    update({ selectedRecipes: [], currentSwipeIndex: 0, step: 4, isGenerating: true });

    timerRef.current = window.setTimeout(() => {
      const { deck, usedFallback } = buildCandidateDeck(equipment, userIngredients, durationDays * frequencyPerDay);
      if (usedFallback) {
        showToast('Beberapa resep memerlukan alat tambahan, sesuaikan dengan alat di kosmu.', 'info');
      }
      update({ candidateRecipes: deck, isGenerating: false });
    }, 650);
  };

  const restartSwipe = () => {
    update({ selectedRecipes: [], currentSwipeIndex: 0, step: 4 });
  };

  const generateFinalSchedule = () => {
    if (planner.selectedRecipes.length === 0) {
      showToast('Pilih minimal 1 resep sebelum menyusun jadwal.', 'warning');
      return;
    }
    update({
      generatedSchedule: buildSchedule(planner.selectedRecipes, planner.durationDays, planner.frequencyPerDay),
      step: 7,
    });
  };

  const common = { planner, update, goToStep, showToast };

  return (
    <section className="max-w-3xl mx-auto space-y-6">
      <Stepper step={planner.step} onCancel={onCancel} />

      {planner.step === 1 && <Step1Inventory {...common} />}
      {planner.step === 2 && <Step2Duration {...common} />}
      {planner.step === 3 && <Step3Budget {...common} onGenerate={generateAIRecipes} />}
      {planner.step === 4 && <Step4Swipe {...common} onOpenRecipe={onOpenRecipe} />}
      {planner.step === 5 && <Step5Optimization {...common} onRestartSwipe={restartSwipe} />}
      {planner.step === 6 && <Step6Summary {...common} onGenerateSchedule={generateFinalSchedule} />}
      {planner.step === 7 && <Step7Schedule {...common} onOpenRecipe={onOpenRecipe} onSave={onSavePlan} />}
    </section>
  );
}
