import React, { useState } from 'react';
import { MealPlan, Recipe } from '../types';
import { getSavedMealPlans, deleteMealPlanFromStorage } from '../services/storage';
import { RecipeDetailModal } from './RecipeDetailModal';
import { Calendar, Trash2, TrendingDown, Clock, ShoppingBag, ChevronRight, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';

interface SavedMealPlansSectionProps {
  onStartNewPlan: () => void;
}

export const SavedMealPlansSection: React.FC<SavedMealPlansSectionProps> = ({
  onStartNewPlan
}) => {
  const [plans, setPlans] = useState<MealPlan[]>(getSavedMealPlans());
  const [activePlanModal, setActivePlanModal] = useState<MealPlan | null>(null);
  const [selectedRecipeForModal, setSelectedRecipeForModal] = useState<Recipe | null>(null);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Apakah Anda yakin ingin menghapus Meal Plan ini dari penyimpanan lokal browser?')) {
      const updated = deleteMealPlanFromStorage(id);
      setPlans(updated);
      if (activePlanModal?.id === id) setActivePlanModal(null);
    }
  };

  if (plans.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-xs space-y-4 my-8">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
          <Calendar className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Belum Ada Meal Plan Tersimpan</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Anda belum memiliki rencana memasak yang tersimpan di browser ini. Gunakan AI Meal Planner untuk membuat rencana hemat hingga 7 hari.
          </p>
        </div>
        <button
          onClick={onStartNewPlan}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-md shadow-emerald-600/20 text-xs inline-flex items-center gap-2 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          Buat AI Meal Plan Sekarang
        </button>
      </div>
    );
  }

  return (
    <section className="space-y-6 my-10 animate-fadeIn">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-600" />
            Meal Plan Saya (Tersimpan Lokal)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Daftar rencana memasak yang tersimpan di browser Anda tanpa perlu login.
          </p>
        </div>

        <button
          onClick={onStartNewPlan}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <Sparkles className="w-4 h-4" />
          + Buat Plan Baru
        </button>
      </div>

      {/* Grid of Saved Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setActivePlanModal(plan)}
            className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {plan.createdAt}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                    {plan.name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={(e) => handleDelete(plan.id, e)}
                  className="text-slate-300 hover:text-rose-600 transition-colors p-1"
                  title="Hapus Meal Plan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Stats pill */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Biaya Masak
                  </span>
                  <span className="text-sm font-black text-emerald-600">
                    Rp{plan.totalEstimatedCost.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                    Potensi Hemat
                  </span>
                  <span className="text-sm font-black text-emerald-900">
                    Rp{plan.totalSavings.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Menu list teaser */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Contoh Menu Terjadwal:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {plan.slots.slice(0, 3).map((slot, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold line-clamp-1 max-w-[140px]"
                    >
                      {slot.recipe.name}
                    </span>
                  ))}
                  {plan.slots.length > 3 && (
                    <span className="px-2 py-1 text-xs text-slate-400 font-bold">
                      +{plan.slots.length - 3} menu lainnya
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Footer button */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>Buka Detail Meal Plan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Active Plan Full Modal View */}
      {activePlanModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto border border-slate-100">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                  Detail Meal Plan Tersimpan
                </span>
                <h3 className="text-2xl font-black">{activePlanModal.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dibuat pada {activePlanModal.createdAt} • {activePlanModal.config.days} Hari
                </p>
              </div>

              <button
                onClick={() => setActivePlanModal(null)}
                className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Biaya Bahan Terpakai
                  </span>
                  <span className="text-base font-black text-emerald-600">
                    Rp{activePlanModal.totalEstimatedCost.toLocaleString('id-ID')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Total Belanja Kemasan
                  </span>
                  <span className="text-base font-black text-slate-800">
                    Rp{activePlanModal.totalShoppingCost.toLocaleString('id-ID')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Jika Beli Makanan Luar
                  </span>
                  <span className="text-base font-black text-slate-400 line-through">
                    Rp{activePlanModal.totalOutsideCost.toLocaleString('id-ID')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase block">
                    Total Hemat
                  </span>
                  <span className="text-base font-black text-emerald-600">
                    Rp{activePlanModal.totalSavings.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Schedule Matrix */}
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 mb-3">
                  Jadwal Masakan Harian:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {activePlanModal.slots.map((slot, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedRecipeForModal(slot.recipe)}
                      className="bg-slate-50 hover:bg-emerald-50/70 p-3.5 rounded-2xl border border-slate-200 cursor-pointer transition-colors flex items-center gap-3"
                    >
                      <img
                        src={slot.recipe.image}
                        alt={slot.recipe.name}
                        className="w-12 h-12 object-cover rounded-xl"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block">
                          Hari {slot.day} • {slot.mealLabel}
                        </span>
                        <h5 className="text-xs font-bold text-slate-900 line-clamp-1">
                          {slot.recipe.name}
                        </h5>
                        <span className="text-[10px] text-emerald-600 font-bold block">
                          Rp{slot.recipe.estimatedCost.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shopping List */}
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 mb-3">
                  Daftar Belanja Pasar Yogyakarta:
                </h4>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                  {activePlanModal.shoppingList.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs py-1 border-b border-slate-200/50 last:border-0"
                    >
                      <span className="font-semibold text-slate-800">
                        • {item.name} ({item.quantity} {item.unit})
                      </span>
                      <span className="font-bold text-slate-900">
                        {item.isOwned ? 'Stok Kos' : `Rp${item.packagePrice.toLocaleString('id-ID')}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActivePlanModal(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm"
              >
                Tutup Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        recipe={selectedRecipeForModal}
        onClose={() => setSelectedRecipeForModal(null)}
      />
    </section>
  );
};
