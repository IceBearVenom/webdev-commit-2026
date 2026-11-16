import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { MealPlan, Recipe } from '../../types';
import { saveMealPlanToStorage } from '../../services/storage';
import { RecipeDetailModal } from '../RecipeDetailModal';
import { Calendar, Save, CheckCircle2, TrendingDown, Clock, ShoppingBag, ChevronRight, Home, Sparkles, ExternalLink } from 'lucide-react';

interface Step7Props {
  mealPlan: MealPlan;
  onPlanSaved: () => void;
}

export const Step7ResultGrid: React.FC<Step7Props> = ({ mealPlan, onPlanSaved }) => {
  const [selectedRecipeForModal, setSelectedRecipeForModal] = useState<Recipe | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'grid' | 'shopping'>('grid');

  const DAYS_NAME = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  const handleSavePlan = () => {
    const success = saveMealPlanToStorage(mealPlan);
    if (success) {
      setIsSaved(true);
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback if confetti library issue
      }
      setTimeout(() => {
        onPlanSaved();
      }, 1500);
    }
  };

  // Group slots by Day number
  const slotsByDay = new Map<number, typeof mealPlan.slots>();
  mealPlan.slots.forEach((slot) => {
    const existing = slotsByDay.get(slot.day) || [];
    slotsByDay.set(slot.day, [...existing, slot]);
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold">
              Step 7 • Meal Plan Result
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black">
              Yogyakarta Student Approved
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">{mealPlan.name}</h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-xl">
            Tabel rencana memasak hemat Anda selama {mealPlan.config.days} hari. Klik menu manapun untuk melihat resep & cara masak lengkap.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSavePlan}
          disabled={isSaved}
          className={`px-8 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl transition-all transform hover:-translate-y-0.5 shrink-0 ${
            isSaved
              ? 'bg-white text-emerald-700 shadow-none cursor-default'
              : 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-emerald-400/20'
          }`}
        >
          {isSaved ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              Tersimpan di Browser!
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Simpan Meal Plan (Ke Homepage)
            </>
          )}
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Estimasi Memasak
          </span>
          <span className="text-xl font-black text-emerald-600 mt-1 block">
            Rp{mealPlan.totalEstimatedCost.toLocaleString('id-ID')}
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1 block">
            Dari budget Rp{mealPlan.config.budget.toLocaleString('id-ID')}
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Uang Belanja Kemasan
          </span>
          <span className="text-xl font-black text-slate-800 mt-1 block">
            Rp{mealPlan.totalShoppingCost.toLocaleString('id-ID')}
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1 block">
            Harga pasar di Yogyakarta
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Bila Beli Makanan Luar
          </span>
          <span className="text-xl font-black text-slate-400 line-through mt-1 block">
            Rp{mealPlan.totalOutsideCost.toLocaleString('id-ID')}
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1 block">
            Estimasi warung sekitar kos
          </span>
        </div>

        <div className="bg-gradient-to-tr from-emerald-500 to-teal-600 text-white p-5 rounded-3xl shadow-lg">
          <span className="text-[11px] font-bold text-emerald-100 uppercase tracking-wider block">
            Potensi Hemat Bersih
          </span>
          <span className="text-xl font-black mt-1 block">
            Rp{mealPlan.totalSavings.toLocaleString('id-ID')}
          </span>
          <span className="text-xs text-emerald-100 font-semibold mt-1 block flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" /> Rumus PRD DapurKos
          </span>
        </div>
      </div>

      {/* Tabs selector */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => setActiveTab('grid')}
          className={`pb-3 font-extrabold text-sm flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'grid'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Tabel Matriks Harian ({mealPlan.config.days} Hari)
        </button>

        <button
          onClick={() => setActiveTab('shopping')}
          className={`pb-3 font-extrabold text-sm flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'shopping'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Daftar Belanja Pasar ({mealPlan.shoppingList.length} Bahan)
        </button>
      </div>

      {/* Tab 1: Grid Result */}
      {activeTab === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from(slotsByDay.entries()).map(([dayNum, daySlots]) => {
            const dayName = DAYS_NAME[(dayNum - 1) % 7];
            const dayTotal = daySlots.reduce((sum, s) => sum + s.recipe.estimatedCost, 0);

            return (
              <div
                key={dayNum}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
              >
                {/* Day Header */}
                <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center">
                      H{dayNum}
                    </span>
                    <div>
                      <h4 className="font-extrabold text-base leading-none">{dayName}</h4>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Hari ke-{dayNum}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-400">
                    Rp{dayTotal.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Slots */}
                <div className="p-4 space-y-3">
                  {daySlots.map((slot, sIdx) => (
                    <div
                      key={sIdx}
                      onClick={() => setSelectedRecipeForModal(slot.recipe)}
                      className="group bg-slate-50 hover:bg-emerald-50/60 rounded-2xl p-3 border border-slate-200/80 hover:border-emerald-300 transition-all cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={slot.recipe.image}
                          alt={slot.recipe.name}
                          className="w-12 h-12 object-cover rounded-xl shrink-0"
                        />
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            {slot.mealLabel}
                          </span>
                          <h5 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                            {slot.recipe.name}
                          </h5>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                            <span className="text-emerald-600 font-bold">
                              Rp{slot.recipe.estimatedCost.toLocaleString('id-ID')}
                            </span>
                            <span>• {slot.recipe.cookingTime}m</span>
                          </div>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Shopping List */}
      {activeTab === 'shopping' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Daftar Belanja Pasar Tradisional / Supermarket Yogyakarta
              </h3>
              <p className="text-xs text-slate-500">
                Daftar bahan yang harus Anda beli beserta perkiraan ukuran kemasannya.
              </p>
            </div>

            <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              Total Belanja: Rp{mealPlan.totalShoppingCost.toLocaleString('id-ID')}
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {mealPlan.shoppingList.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      item.isOwned ? 'bg-slate-300' : 'bg-emerald-500'
                    }`}
                  />
                  <div>
                    <span
                      className={`font-bold ${
                        item.isOwned ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {item.name}
                    </span>
                    <span className="text-slate-500 text-xs ml-2">
                      (Butuh: {item.quantity} {item.unit})
                    </span>
                  </div>
                </div>

                <div>
                  {item.isOwned ? (
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                      Stok Kos Ada
                    </span>
                  ) : (
                    <span className="font-extrabold text-slate-900">
                      Rp{item.packagePrice.toLocaleString('id-ID')}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <RecipeDetailModal
        recipe={selectedRecipeForModal}
        onClose={() => setSelectedRecipeForModal(null)}
      />
    </div>
  );
};
