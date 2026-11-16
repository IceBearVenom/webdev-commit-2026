import { useMemo } from 'react';
import { calculateRecipeMetrics, evaluateSelection } from '../../utils/calculations';
import { formatRupiah } from '../../utils/format';
import { DAY_LABELS, getSlotLabel } from '../../utils/schedule';
import type { BaseStepProps } from './stepProps';

interface Step7Props extends BaseStepProps {
  onOpenRecipe: (recipeId: string) => void;
  onSave: () => void;
}

export function Step7Schedule({ planner, goToStep, onOpenRecipe, onSave }: Step7Props) {
  const evalData = useMemo(
    () =>
      evaluateSelection(
        planner.selectedRecipes,
        planner.userIngredients,
        planner.totalBudget,
        planner.durationDays,
        planner.frequencyPerDay,
      ),
    [planner.selectedRecipes, planner.userIngredients, planner.totalBudget, planner.durationDays, planner.frequencyPerDay],
  );

  const dayLabels = DAY_LABELS.slice(0, planner.durationDays);
  const slots = Array.from({ length: planner.frequencyPerDay }, (_, i) => i);

  return (
    <div className="bg-(--primary-light) rounded-3xl p-6 sm:p-8 border border-(--primary-dark)-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-(--primary)/20 text-(--primary-dark) text-xs font-bold mb-1">
            Siap Dimasak!
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-(--primary-dark)">Jadwal Meal Plan Kosmu</h2>
          <p className="text-xs sm:text-sm text-(--primary-dark)-500">
            Klik menu pada tabel untuk melihat cara memasak, alat, dan rincian penghematan.
          </p>
        </div>
        <div className="text-left sm:text-right bg-(--primary)/10 px-4 py-2.5 rounded-2xl border border-(--primary)/20">
          <span className="text-[11px] text-(--primary) block font-medium">Total Potensi Hemat</span>
          <span className="text-lg font-extrabold text-(--primary)">{formatRupiah(evalData.totalSavings)}</span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-(--primary-dark)-200">
        <table className="w-full text-left border-collapse min-w-[520px]">
          <thead className="bg-(--primary-dark)-50 border-b border-(--primary-dark)-200 text-xs font-bold text-(--primary-dark)-700 uppercase">
            <tr>
              <th className="p-3.5">Waktu Makan</th>
              {dayLabels.map((d) => (
                <th key={d} className="p-3.5">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-(--primary-dark)-100 text-sm">
            {slots.map((f) => (
              <tr key={f}>
                <td className="p-3.5 font-bold text-(--primary-dark)-700 bg-(--primary-dark)-50/60">
                  {getSlotLabel(planner.frequencyPerDay, f)}
                </td>
                {dayLabels.map((_, dIdx) => {
                  const rec = planner.generatedSchedule[dIdx]?.[f];
                  if (!rec) return <td key={dIdx} className="p-3.5 text-(--primary-dark)-400">-</td>;
                  const metrics = calculateRecipeMetrics(rec);
                  return (
                    <td key={dIdx} className="p-3.5">
                      <button
                        onClick={() => onOpenRecipe(rec.id)}
                        className="w-full text-left p-2.5 rounded-xl bg-(--primary)/10 hover:bg-(--primary)/20 border border-(--primary)/30 transition group"
                      >
                        <div className="font-bold text-(--primary-dark) group-hover:text-(--primary) text-xs sm:text-sm">
                          {rec.name}
                        </div>
                        <div className="text-[11px] text-(--primary) font-semibold mt-0.5">
                          {formatRupiah(metrics.cookCost)}{' '}
                          <span className="text-(--primary-dark)-400 font-normal">• {rec.cookingTime}m</span>
                        </div>
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row justify-between gap-3">
        <button
          onClick={() => goToStep(6)}
          className="px-5 py-3 rounded-2xl bg-(--primary-dark)-100 hover:bg-(--primary-dark)-200 text-(--primary-dark)-700 font-semibold text-sm transition"
        >
          <i className="fa-solid fa-arrow-left mr-1.5"></i>Kembali ke Ringkasan
        </button>
        <button
          onClick={onSave}
          className="px-6 py-3.5 rounded-2xl bg-(--primary) hover:bg-(--primary)/85 text-white font-bold text-sm shadow-lg shadow-(--primary)/25 transition flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-bookmark"></i>
          <span>Simpan Meal Plan ke Beranda</span>
        </button>
      </div>
    </div>
  );
}
