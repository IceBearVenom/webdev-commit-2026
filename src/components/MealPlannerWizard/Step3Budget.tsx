import React from 'react';
import { Wallet, Sparkles, ArrowLeft, Info } from 'lucide-react';

interface Step3Props {
  budget: number;
  setBudget: (b: number) => void;
  days: number;
  mealsPerDay: number;
  onNext: () => void;
  onBack: () => void;
}

export const Step3Budget: React.FC<Step3Props> = ({
  budget,
  setBudget,
  days,
  mealsPerDay,
  onNext,
  onBack
}) => {
  const totalSlots = days * mealsPerDay;
  const budgetPerMeal = Math.round(budget / (totalSlots || 1));

  const PRESET_BUDGETS = [50000, 75000, 100000, 150000, 200000, 300000];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <span className="text-xs font-bold tracking-widest text-emerald-200 uppercase">
          Langkah 3 dari 7 • Budget Configuration
        </span>
        <h2 className="text-2xl sm:text-3xl font-black mt-1">
          Batas Maksimal Anggaran Makan
        </h2>
        <p className="text-sm text-emerald-100 mt-2 max-w-2xl leading-relaxed">
          Tentukan total budget pengeluaran makanan Anda untuk seluruh {days} hari ({totalSlots} porsi masakan). AI akan merekomendasikan resep di bawah batas ini.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div>
          <label className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-600" />
            Total Budget Pengeluaran (IDR)
          </label>
          <p className="text-xs text-slate-500 mt-1">
            Geser slider atau ketik nominal budget Anda.
          </p>
        </div>

        {/* Display Box */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-center text-white shadow-lg">
          <span className="text-xs text-slate-400 uppercase tracking-widest block font-bold">
            Total Anggaran Terpasang
          </span>
          <div className="text-3xl sm:text-4xl font-black text-emerald-400 mt-2 tracking-tight">
            Rp{budget.toLocaleString('id-ID')}
          </div>
          <div className="mt-2 text-xs text-slate-300 font-medium">
            ± Rp{budgetPerMeal.toLocaleString('id-ID')} per sekali makan
          </div>
        </div>

        {/* Slider */}
        <div className="space-y-2 pt-2">
          <input
            type="range"
            min={30000}
            max={500000}
            step={5000}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-slate-400 font-semibold">
            <span>Rp30.000</span>
            <span>Rp250.000</span>
            <span>Rp500.000</span>
          </div>
        </div>

        {/* Quick Presets */}
        <div>
          <span className="text-xs font-bold text-slate-500 block mb-3 uppercase tracking-wider">
            Pilihan Budget Cepat:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {PRESET_BUDGETS.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setBudget(val)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-extrabold transition-all ${
                  budget === val
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm ring-2 ring-emerald-600/30'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Rp{val.toLocaleString('id-ID')}
              </button>
            ))}
          </div>
        </div>

        {/* PRD Note on Budget */}
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-amber-950">Catatan Validasi Budget (Yogyakarta)</span>
            <p className="mt-0.5 text-amber-800 leading-relaxed">
              Budget menjadi batas maksimal estimasi pengeluaran. AI akan memvalidasi biaya bahan terpakai dan memberikan opsi penyesuaian bahan jika melampaui batas ini.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl flex items-center gap-2 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>

        <button
          onClick={onNext}
          className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
        >
          <span>Generate Resep AI (Step 4)</span>
          <Sparkles className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
