import type { SavedMealPlan } from '../../types';
import { calculateRecipeMetrics } from '../../utils/calculations';
import { formatRupiah } from '../../utils/format';
import { DAY_LABELS, getSlotLabel } from '../../utils/schedule';

interface SavedPlanDetailProps {
  plan: SavedMealPlan;
  onBack: () => void;
  onOpenRecipe: (recipeId: string) => void;
}

export function SavedPlanDetail({ plan, onBack, onOpenRecipe }: SavedPlanDetailProps) {
  const days = DAY_LABELS.slice(0, plan.durationDays);
  const slots = Array.from({ length: plan.frequencyPerDay }, (_, i) => i);

  return (
    <section className="max-w-4xl mx-auto space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-600 transition"
      >
        <i className="fa-solid fa-arrow-left"></i>
        <span>Kembali ke Beranda</span>
      </button>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Tersimpan di Browser</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">{plan.title}</h2>
            <p className="text-xs text-slate-500 mt-1">
              Tanggal Perencanaan: {plan.createdAt} • {plan.durationDays} Hari ({plan.frequencyPerDay}x/hari)
            </p>
          </div>
          <div className="flex gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Estimasi Biaya</span>
              <span className="font-extrabold text-slate-900">{formatRupiah(plan.totalUsedCost)}</span>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-[11px] text-emerald-700 block">Potensi Hemat</span>
              <span className="font-extrabold text-emerald-700">{formatRupiah(plan.totalSavings)}</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead className="border-b border-slate-200 text-xs font-bold text-slate-700 uppercase">
              <tr>
                <th className="p-3.5 bg-slate-50">Sesi</th>
                {days.map((d) => (
                  <th key={d} className="p-3.5 bg-slate-50">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {slots.map((f) => (
                <tr key={f}>
                  <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">
                    {getSlotLabel(plan.frequencyPerDay, f)}
                  </td>
                  {days.map((_, dIdx) => {
                    const rec = plan.schedule[dIdx]?.[f];
                    if (!rec) {
                      return (
                        <td key={dIdx} className="p-3.5 text-slate-400">
                          -
                        </td>
                      );
                    }
                    const metrics = calculateRecipeMetrics(rec);
                    return (
                      <td key={dIdx} className="p-3.5">
                        <button onClick={() => onOpenRecipe(rec.id)} className="text-left group">
                          <div className="font-bold text-slate-800 group-hover:text-emerald-600 transition">
                            {rec.name}
                          </div>
                          <div className="text-xs text-emerald-600 font-medium">{formatRupiah(metrics.cookCost)}</div>
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
