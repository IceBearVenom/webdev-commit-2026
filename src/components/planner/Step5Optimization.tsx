import { useEffect, useMemo, useState } from 'react';
import { calculateRecipeMetrics, evaluateSelection, getEconomicalPool } from '../../utils/calculations';
import { formatRupiah } from '../../utils/format';
import type { BaseStepProps } from './stepProps';

interface Step5Props extends BaseStepProps {
  onRestartSwipe: () => void;
}

export function Step5Optimization({ planner, update, goToStep, showToast, onRestartSwipe }: Step5Props) {
  const [dismissed, setDismissed] = useState(false);
  const { selectedRecipes, userIngredients, totalBudget, durationDays, frequencyPerDay, equipment } = planner;

  const evalData = useMemo(
    () => evaluateSelection(selectedRecipes, userIngredients, totalBudget, durationDays, frequencyPerDay),
    [selectedRecipes, userIngredients, totalBudget, durationDays, frequencyPerDay],
  );

  // Re-show the AI suggestion whenever the selection changes
  useEffect(() => {
    setDismissed(false);
  }, [selectedRecipes]);

  const overBy = evalData.totalUsedCost - totalBudget;

  const swapWithCheaper = (index: number) => {
    const current = selectedRecipes[index];
    const currentCost = calculateRecipeMetrics(current).cookCost;
    const cheaper = getEconomicalPool(equipment, current.id).filter((r) => r.cookCost < currentCost);
    if (cheaper.length === 0) {
      showToast('Ini sudah menu termurah yang bisa kamu masak dengan alat yang ada.', 'info');
      return;
    }
    // Pool is sorted cheapest-first: take the cheapest one that isn't already in the plan, else the cheapest overall.
    const pickedIds = new Set(selectedRecipes.map((r) => r.id));
    const replacement = cheaper.find((r) => !pickedIds.has(r.id)) ?? cheaper[0];
    const next = [...selectedRecipes];
    next[index] = replacement;
    update({ selectedRecipes: next });
    showToast(`Menu diganti menjadi ${replacement.name} (${formatRupiah(replacement.cookCost)}).`, 'success');
  };

  const autoOptimize = () => {
    const pool = getEconomicalPool(equipment);
    if (pool.length === 0) {
      showToast('Tidak ada resep lain yang cocok dengan alat masakmu.', 'warning');
      return;
    }

    const next = [...selectedRecipes];
    let changed = false;

    // Repeatedly swap the priciest pick for the cheapest recipe that is cheaper than it.
    while (evaluateSelection(next, userIngredients, totalBudget, durationDays, frequencyPerDay).isOverBudget) {
      let maxIdx = 0;
      let maxCost = -1;
      next.forEach((r, i) => {
        const c = calculateRecipeMetrics(r).cookCost;
        if (c > maxCost) {
          maxCost = c;
          maxIdx = i;
        }
      });

      const replacement = pool[0];
      if (replacement.cookCost >= maxCost) break;
      next[maxIdx] = replacement;
      changed = true;
    }

    if (!changed) {
      showToast('Tidak ada menu yang lebih murah dengan alat masak yang kamu punya.', 'info');
      return;
    }

    update({ selectedRecipes: next });
    const stillOver = evaluateSelection(next, userIngredients, totalBudget, durationDays, frequencyPerDay).isOverBudget;
    if (stillOver) {
      showToast('Menu sudah dioptimalkan semaksimal mungkin, tapi masih di atas budget. Coba naikkan budget atau kurangi durasi.', 'warning');
    } else {
      showToast('AI berhasil mengoptimalkan menu agar sesuai budget!', 'success');
    }
  };

  const dismiss = () => {
    setDismissed(true);
    showToast('Optimasi diabaikan. Kamu tetap memegang kendali penuh atas pilihanmu.', 'info');
  };

  return (
    <div className="bg-(--primary-light) rounded-3xl p-6 sm:p-8 border border-(--primary-dark)-200 shadow-sm space-y-6">
      {/* Status header */}
      <div className="space-y-2">
        {evalData.isOverBudget ? (
          <>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
              <i className="fa-solid fa-triangle-exclamation"></i> Melebihi Budget ({formatRupiah(overBy)})
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-(--primary-dark)">Evaluasi &amp; Optimasi Budget</h2>
            <p className="text-sm text-(--primary-dark)-500">
              Total biaya resep pilihanmu ({formatRupiah(evalData.totalUsedCost)}) melebihi batas anggaran (
              {formatRupiah(totalBudget)}).
            </p>
          </>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--primary)/20 text-(--primary-dark) text-xs font-bold">
              <i className="fa-solid fa-circle-check"></i> Sesuai Budget! Sisa {formatRupiah(evalData.remainingBudget)}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-(--primary-dark)">Evaluasi &amp; Optimasi Menu</h2>
            <p className="text-sm text-(--primary-dark)-500">
              Semua menu pilihanmu masuk dalam anggaran. Kamu tetap bisa mengganti menu jika diinginkan.
            </p>
          </>
        )}
      </div>

      {/* Selected recipes */}
      <div className="space-y-2.5">
        <h3 className="text-sm font-bold text-(--primary-dark)-800">Daftar Resep Terpilih &amp; Evaluasi Biaya:</h3>
        <div className="space-y-2.5">
          {planner.selectedRecipes.length === 0 && (
            <p className="p-4 rounded-2xl border border-dashed border-(--primary-dark)-300 text-sm text-(--primary-dark)-500 text-center">
              Belum ada resep yang dipilih. Pilih ulang menu untuk melanjutkan.
            </p>
          )}
          {planner.selectedRecipes.map((rec, idx) => {
            const m = calculateRecipeMetrics(rec);
            return (
              <div
                key={`${rec.id}-${idx}`}
                className="p-3.5 rounded-2xl border border-(--primary-dark)-200 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-(--primary-dark)-100 text-(--secondary-dark) font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-bold text-sm text-(--primary-dark)">{rec.name}</div>
                    <div className="text-xs text-(--primary-dark)-500">
                      Biaya: <strong className="text-(--primary)">{formatRupiah(m.cookCost)}</strong> • Hemat{' '}
                      {formatRupiah(m.savings)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => swapWithCheaper(idx)}
                  className="px-3 py-1.5 rounded-xl bg-(--primary-dark)-100 hover:bg-(--primary)/10 hover:text-(--primary) text-xs font-semibold text-(--secondary-dark) transition"
                >
                  <i className="fa-solid fa-arrows-rotate mr-1"></i>Ganti Lebih Hemat
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI optimization suggestion */}
      {evalData.isOverBudget && !dismissed && (
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/30 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <i className="fa-solid fa-lightbulb"></i>
            </div>
            <div className="space-y-1 flex-1">
              <h4 className="font-bold text-amber-950 text-sm">Rekomendasi Optimasi Budget AI</h4>
              <p className="text-xs text-amber-900 leading-relaxed">
                AI mendeteksi pengeluaran melebihi budget sebesar {formatRupiah(overBy)}. AI dapat mengganti menu
                termahal dengan menu ekonomis berbasis telur/tempe yang menggunakan bahan sama.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={autoOptimize}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-(--primary-dark)-950 font-bold text-xs transition"
            >
              <i className="fa-solid fa-wand-magic-sparkles mr-1"></i>Terapkan Optimasi Otomatis AI
            </button>
            <button
              onClick={dismiss}
              className="px-4 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 font-semibold text-xs hover:bg-amber-100/50 transition"
            >
              Abaikan &amp; Tetap Lanjut
            </button>
          </div>
        </div>
      )}

      <div className="pt-4 flex justify-between">
        <button
          onClick={onRestartSwipe}
          className="px-5 py-3 rounded-2xl bg-(--primary-dark)-100 hover:bg-(--primary-dark)-200 text-(--primary-dark)-700 font-semibold text-sm transition"
        >
          <i className="fa-solid fa-rotate-left mr-1.5"></i>Pilih Ulang Menu
        </button>
        <button
          onClick={() => goToStep(6)}
          disabled={planner.selectedRecipes.length === 0}
          className="px-6 py-3 rounded-2xl bg-(--primary) hover:bg-(--primary)/85 text-white font-bold text-sm transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Lanjut: Ringkasan Rencana</span>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}
