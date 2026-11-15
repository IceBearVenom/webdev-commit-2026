import { formatRupiah } from '../../utils/format';
import type { BaseStepProps } from './stepProps';

const PRESETS = [
  { amount: 35000, label: 'Rp 35.000 (Mode Bertahan)' },
  { amount: 75000, label: 'Rp 75.000 (Hemat Standar)' },
  { amount: 150000, label: 'Rp 150.000 (Mingguan Aman)' },
];

interface Step3Props extends BaseStepProps {
  onGenerate: () => void;
}

export function Step3Budget({ planner, update, goToStep, onGenerate }: Step3Props) {
  const totalMeals = planner.durationDays * planner.frequencyPerDay;
  const avg = totalMeals > 0 ? Math.round(planner.totalBudget / totalMeals) : 0;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Konfigurasi Total Budget</h2>
        <p className="text-sm text-slate-500 mt-1">
          Masukkan batas maksimal anggaran makan untuk seluruh periode{' '}
          <strong>
            {planner.durationDays} hari ({totalMeals} kali makan)
          </strong>
          .
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-lg">Rp</span>
          <input
            type="number"
            value={planner.totalBudget === 0 ? '' : planner.totalBudget}
            min={10000}
            step={5000}
            aria-label="Total budget"
            onChange={(e) => update({ totalBudget: parseInt(e.target.value, 10) || 0 })}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-emerald-600 focus:outline-none text-2xl font-extrabold text-slate-900"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.amount}
              type="button"
              onClick={() => update({ totalBudget: p.amount })}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-xs font-semibold text-slate-700 transition"
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs sm:text-sm space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <i className="fa-solid fa-calculator text-amber-600"></i>
            <span>
              Rata-rata Budget per Sesi Masak: <span className="underline">{formatRupiah(avg)}</span>
            </span>
          </div>
          <p className="text-amber-800/90 text-xs">
            Sistem memvalidasi harga bahan menggunakan referensi pasar Yogyakarta &amp; memperhitungkan bahan yang
            sudah kamu miliki.
          </p>
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <button
          onClick={() => goToStep(2)}
          className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition"
        >
          <i className="fa-solid fa-arrow-left mr-1.5"></i>Kembali
        </button>
        <button
          onClick={onGenerate}
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition flex items-center gap-2"
        >
          <i className="fa-solid fa-wand-magic-sparkles"></i>
          <span>Generate Rekomendasi AI</span>
        </button>
      </div>
    </div>
  );
}
