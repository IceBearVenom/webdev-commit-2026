import { useMemo } from 'react';
import { evaluateMealPlanFinancials } from '../../utils/calculations';
import { formatRupiah } from '../../utils/format';
import type { BaseStepProps } from './stepProps';

interface Step6Props extends BaseStepProps {
  onGenerateSchedule: () => void;
}

export function Step6Summary({ planner, goToStep, onGenerateSchedule }: Step6Props) {
  const evalData = useMemo(
    () => evaluateMealPlanFinancials(planner.selectedRecipes, planner.userIngredients, planner.totalBudget),
    [planner.selectedRecipes, planner.userIngredients, planner.totalBudget],
  );

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Ringkasan Perencanaan Memasak</h2>
        <p className="text-sm text-slate-500 mt-1">
          Periksa estimasi biaya bahan terpakai, estimasi belanja pasar, dan daftar bahan sebelum menyusun jadwal.
        </p>
      </div>

      {/* Financial cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
          <span className="text-xs text-slate-500 block">Total Budget</span>
          <span className="text-base sm:text-lg font-extrabold text-slate-900">
            {formatRupiah(planner.totalBudget)}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
          <span className="text-xs text-slate-500 block">Biaya Bahan Dipakai</span>
          <span className="text-base sm:text-lg font-extrabold text-emerald-700">
            {formatRupiah(evalData.totalUsedCost)}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
          <span className="text-xs text-slate-500 block">Sisa Budget</span>
          <span className="text-base sm:text-lg font-extrabold text-slate-900">
            {formatRupiah(Math.max(0, evalData.remainingBudget))}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-600 text-white">
          <span className="text-xs text-emerald-100 block">Potensi Hemat</span>
          <span className="text-base sm:text-lg font-extrabold">{formatRupiah(evalData.totalSavings)}</span>
        </div>
      </div>

      {/* Shopping outlay note */}
      <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
        <i className="fa-solid fa-basket-shopping text-blue-600 mt-0.5 text-sm"></i>
        <div>
          <span className="font-bold">
            Estimasi Uang Belanja di Pasar/Warung:{' '}
            <span className="underline">{formatRupiah(evalData.estimatedShoppingOutlay)}</span>
          </span>
          <p className="text-blue-800/90 mt-0.5">
            Angka ini memperhitungkan satuan beli minimal di pasar Jogja (misal beli tempe 1 papan meski hanya dipakai
            sebagian) setelah dikurangi bahan yang sudah ada di kosmu.
          </p>
        </div>
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl border border-slate-200 space-y-2.5">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <i className="fa-solid fa-cart-shopping text-amber-500"></i>
            <span>Daftar Bahan Perlu Dibeli</span>
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {evalData.toBuyList.length === 0 ? (
              <li className="text-emerald-700 font-semibold">
                <i className="fa-solid fa-check-circle mr-1"></i>Semua bahan sudah tersedia di kosmu!
              </li>
            ) : (
              evalData.toBuyList.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0"
                >
                  <span>
                    <strong>{item.name}</strong> <span className="text-slate-400">({item.packSuggestion})</span>
                  </span>
                  <span className="font-bold text-slate-800">{formatRupiah(item.estimatedShopPrice)}</span>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 space-y-2.5">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <i className="fa-solid fa-box-open text-emerald-600"></i>
            <span>Bahan Sudah Tersedia / Terpakai</span>
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {evalData.availableUsedList.length === 0 ? (
              <li className="text-slate-400 italic">Tidak ada bahan awal yang digunakan.</li>
            ) : (
              evalData.availableUsedList.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0"
                >
                  <span>{item.name}</span>
                  <span className="font-semibold text-emerald-700">
                    {item.qty} {item.unit} terpakai
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <button
          onClick={() => goToStep(5)}
          className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition"
        >
          <i className="fa-solid fa-arrow-left mr-1.5"></i>Ubah Pilihan
        </button>
        <button
          onClick={onGenerateSchedule}
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition flex items-center gap-2"
        >
          <i className="fa-solid fa-calendar-days"></i>
          <span>Susun Jadwal Meal Plan</span>
        </button>
      </div>
    </div>
  );
}
