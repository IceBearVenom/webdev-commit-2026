import { useEffect, useRef, useState } from 'react';
import { calculateRecipeMetrics } from '../../utils/calculations';
import { formatRupiah } from '../../utils/format';
import { SwipeCard, type SwipeDirection } from './SwipeCard';
import type { BaseStepProps } from './stepProps';

interface Step4Props extends BaseStepProps {
  onOpenRecipe: (recipeId: string) => void;
}

export function Step4Swipe({ planner, update, goToStep, showToast, onOpenRecipe }: Step4Props) {
  const [exiting, setExiting] = useState<SwipeDirection | null>(null);
  const timerRef = useRef<number>();

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const targetCount = planner.durationDays * planner.frequencyPerDay;
  const current = planner.candidateRecipes[planner.currentSwipeIndex];
  const ownedNames = planner.userIngredients.map((i) => i.name.toLowerCase());
  const currentCost = planner.selectedRecipes.reduce((sum, r) => sum + calculateRecipeMetrics(r).cookCost, 0);
  const isOver = currentCost > planner.totalBudget;

  const handleDecision = (direction: SwipeDirection) => {
    if (!current || exiting) return;
    setExiting(direction);

    timerRef.current = window.setTimeout(() => {
      const selected = direction === 'right' ? [...planner.selectedRecipes, current] : planner.selectedRecipes;

      if (selected.length >= targetCount) {
        update({ selectedRecipes: selected });
        showToast('Target jumlah resep terpenuhi! Mengevaluasi budget...', 'success');
        goToStep(5);
      } else {
        const next = planner.currentSwipeIndex + 1;
        update({ selectedRecipes: selected, currentSwipeIndex: next });
        if (next >= planner.candidateRecipes.length) goToStep(5);
      }
      setExiting(null);
    }, 240);
  };

  if (planner.isGenerating) {
    return (
      <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl animate-bounce">
          <i className="fa-solid fa-robot"></i>
        </div>
        <h3 className="text-lg font-bold text-slate-900">AI Sedang Meracik Menu Kos Terbaik...</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Mencocokkan alat masak, memaksimalkan sisa bahan, dan menghitung estimasi harga pasar Yogyakarta.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Status bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs text-slate-500 block">Menu Terpilih</span>
          <span className="font-extrabold text-slate-900 text-base">
            <span className="text-emerald-600">{planner.selectedRecipes.length}</span> / <span>{targetCount}</span>{' '}
            Resep
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 block">Estimasi Biaya Terpakai</span>
          <span className="font-extrabold text-slate-900 text-base">
            <span className={isOver ? 'text-rose-600' : 'text-emerald-700'}>{formatRupiah(currentCost)}</span>{' '}
            <span className="text-xs font-normal text-slate-400">/ {formatRupiah(planner.totalBudget)}</span>
          </span>
        </div>
      </div>

      <div className="relative max-w-md mx-auto">
        <div className="relative min-h-[430px] flex items-center justify-center">
          {current && (
            <SwipeCard
              key={planner.currentSwipeIndex}
              recipe={current}
              ownedNames={ownedNames}
              exiting={exiting}
              onDecide={handleDecision}
            />
          )}
        </div>

        <div className="flex items-center justify-center gap-5 mt-5">
          <button
            onClick={() => handleDecision('left')}
            title="Lewati Resep (Swipe Left)"
            aria-label="Lewati resep"
            className="w-14 h-14 rounded-full bg-white border-2 border-rose-200 text-rose-500 hover:bg-rose-50 hover:scale-105 shadow-md flex items-center justify-center text-xl transition"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <button
            onClick={() => current && onOpenRecipe(current.id)}
            title="Lihat Detail Resep"
            className="px-4 py-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm text-xs font-bold flex items-center gap-1.5 transition"
          >
            <i className="fa-solid fa-circle-info text-emerald-600"></i>
            <span>Detail Resep</span>
          </button>
          <button
            onClick={() => handleDecision('right')}
            title="Pilih Resep (Swipe Right)"
            aria-label="Pilih resep"
            className="w-14 h-14 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105 shadow-lg shadow-emerald-600/30 flex items-center justify-center text-xl transition"
          >
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
        <p className="text-center text-xs text-slate-400 mt-3">
          Geser kartu ke <strong>kanan</strong> untuk memilih, ke <strong>kiri</strong> untuk melewati
        </p>
      </div>
    </div>
  );
}
