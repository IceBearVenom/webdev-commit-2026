import React from 'react';
import { Calendar, Clock, Sparkles, ArrowLeft, CheckCircle } from 'lucide-react';

interface Step2Props {
  days: number;
  setDays: (d: number) => void;
  mealsPerDay: number;
  setMealsPerDay: (m: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2Duration: React.FC<Step2Props> = ({
  days,
  setDays,
  mealsPerDay,
  setMealsPerDay,
  onNext,
  onBack
}) => {
  const totalMealSlots = days * mealsPerDay;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <span className="text-xs font-bold tracking-widest text-emerald-200 uppercase">
          Langkah 2 dari 7 • Planning Duration
        </span>
        <h2 className="text-2xl sm:text-3xl font-black mt-1">
          Durasi & Frekuensi Memasak
        </h2>
        <p className="text-sm text-emerald-100 mt-2 max-w-2xl leading-relaxed">
          Tentukan berapa hari Anda merencanakan menu (1-7 hari) serta berapa kali Anda hendak memasak per hari.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Days Selector */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              Durasi Perencanaan (Hari)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Pilih jumlah hari rencana memasak (Maksimal 7 hari).
            </p>
          </div>

          <div className="grid grid-cols-7 gap-2 pt-2">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => {
              const isActive = days === num;
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => setDays(num)}
                  className={`py-4 rounded-2xl border font-black text-lg transition-all flex flex-col items-center justify-center gap-1 ${
                    isActive
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-md ring-2 ring-emerald-600/30'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{num}</span>
                  <span className="text-[10px] font-normal opacity-90">Hari</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Meals per Day Selector */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              Frekuensi Memasak Per Hari
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Berapa kali Anda berencana memasak setiap harinya.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { val: 1, label: '1x Sehari', desc: '1 Makan Utama' },
              { val: 2, label: '2x Sehari', desc: 'Siang & Malam' },
              { val: 3, label: '3x Sehari', desc: 'Pagi, Siang & Malam' }
            ].map((item) => {
              const isActive = mealsPerDay === item.val;
              return (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setMealsPerDay(item.val)}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs text-emerald-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-sm font-extrabold">{item.label}</span>
                  <span className="text-[11px] text-slate-500">{item.desc}</span>
                  {isActive && <CheckCircle className="w-4 h-4 text-emerald-600 mt-1" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary Box */}
      <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
            Total Resep yang Dibutuhkan
          </span>
          <p className="text-xl font-black text-emerald-950 mt-0.5">
            {totalMealSlots} Menu Masakan ({days} Hari × {mealsPerDay}x Masak)
          </p>
        </div>
        <span className="text-xs text-emerald-700 font-semibold bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
          Ideal untuk anak kos
        </span>
      </div>

      {/* Navigation Buttons */}
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
          <span>Lanjut ke Step 3 (Konfigurasi Budget)</span>
          <Sparkles className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
