import React from 'react';
import { Recipe, MealPlanConfig } from '../../types';
import { buildMealPlanResult } from '../../services/mealPlannerEngine';
import { TrendingDown, Wallet, ShoppingBag, CheckCircle, ArrowLeft, Sparkles, Check, PackageCheck } from 'lucide-react';

interface Step6Props {
  selectedRecipes: Recipe[];
  config: MealPlanConfig;
  onConfirm: () => void;
  onBack: () => void;
}

export const Step6Summary: React.FC<Step6Props> = ({
  selectedRecipes,
  config,
  onConfirm,
  onBack
}) => {
  const plan = buildMealPlanResult(selectedRecipes, config);

  const itemsToBuy = plan.shoppingList.filter((i) => !i.isOwned);
  const itemsOwned = plan.shoppingList.filter((i) => i.isOwned);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <span className="text-xs font-bold tracking-widest text-emerald-200 uppercase">
          Langkah 6 dari 7 • AI Planning Summary
        </span>
        <h2 className="text-2xl sm:text-3xl font-black mt-1">
          Ringkasan Rencana Memasak
        </h2>
        <p className="text-sm text-emerald-100 mt-2 max-w-2xl leading-relaxed">
          Tinjau ringkasan total biaya, estimasi penghematan, serta daftar bahan masakan yang perlu dibeli di pasar sebelum membuat matriks jadwal harian.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Recipes */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Resep Terpilih
          </span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">
            {plan.slots.length} Menu
          </span>
          <span className="text-xs text-slate-500 font-medium mt-1 block">
            {config.days} Hari ({config.mealsPerDay}x / hari)
          </span>
        </div>

        {/* Total Estimated Cost */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Biaya Bahan Terpakai
          </span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">
            Rp{plan.totalEstimatedCost.toLocaleString('id-ID')}
          </span>
          <span className="text-xs text-slate-500 font-medium mt-1 block">
            Sisa Budget: Rp{(config.budget - plan.totalEstimatedCost).toLocaleString('id-ID')}
          </span>
        </div>

        {/* Shopping Package Budget */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Estimasi Belanja Kemasan
          </span>
          <span className="text-2xl font-black text-slate-800 mt-1 block">
            Rp{plan.totalShoppingCost.toLocaleString('id-ID')}
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1 block">
            Total kemasan di pasar
          </span>
        </div>

        {/* Potential Savings */}
        <div className="bg-emerald-500 text-white rounded-3xl p-5 shadow-lg shadow-emerald-500/20">
          <span className="text-[11px] font-bold text-emerald-100 uppercase tracking-wider block">
            Total Potensi Penghematan
          </span>
          <span className="text-2xl font-black mt-1 block">
            Rp{plan.totalSavings.toLocaleString('id-ID')}
          </span>
          <span className="text-xs text-emerald-100 font-medium mt-1 block flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" /> vs Beli Makanan Luar
          </span>
        </div>
      </div>

      {/* Shopping List Section (Items to Buy vs Owned) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ingredients to Buy */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              Daftar Bahan Perlu Dibeli ({itemsToBuy.length})
            </h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              Estimasi Pasar Jogja
            </span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {itemsToBuy.length > 0 ? (
              itemsToBuy.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="font-bold text-slate-800">{item.name}</span>
                    <span className="text-slate-400 font-normal">
                      ({item.quantity} {item.unit})
                    </span>
                  </div>
                  <span className="font-extrabold text-slate-900">
                    Rp{item.packagePrice.toLocaleString('id-ID')}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-xs text-slate-400 font-medium">
                Seluruh bahan masakan sudah tersedia di kos Anda!
              </div>
            )}
          </div>
        </div>

        {/* Owned Ingredients */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-emerald-600" />
              Bahan yang Sudah Dimiliki Kos ({itemsOwned.length})
            </h3>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              Hemat Rp0
            </span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {itemsOwned.length > 0 ? (
              itemsOwned.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-emerald-950">{item.name}</span>
                  </div>
                  <span className="text-emerald-700 font-bold">Terpakai dari Stok</span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-xs text-slate-400 font-medium">
                Tidak ada bahan dari stok awal yang terpakai.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Selected Recipes Preview Grid */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Daftar Menu Terpilih ({selectedRecipes.length}):
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {selectedRecipes.map((r, i) => (
            <div key={i} className="bg-slate-50 rounded-2xl p-2.5 border border-slate-200 text-center">
              <img src={r.image} alt={r.name} className="w-full h-20 object-cover rounded-xl" />
              <span className="text-xs font-bold text-slate-900 mt-2 block line-clamp-1">
                {r.name}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold block">
                Rp{r.estimatedCost.toLocaleString('id-ID')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl flex items-center gap-2 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Ubah Pilihan
        </button>

        <button
          onClick={onConfirm}
          className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 text-base"
        >
          <span>Konfirmasi & Buat Meal Plan (Step 7)</span>
          <Sparkles className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
