import React, { useState } from 'react';
import { Recipe, MealPlanConfig } from '../../types';
import { Heart, X, Info, Sparkles, CheckCircle2, TrendingDown, Clock, Utensils, ArrowLeft, RefreshCw } from 'lucide-react';

interface Step4Props {
  candidates: Recipe[];
  config: MealPlanConfig;
  selectedRecipes: Recipe[];
  setSelectedRecipes: (recipes: Recipe[]) => void;
  onNext: () => void;
  onBack: () => void;
  onOpenRecipeDetail: (recipe: Recipe) => void;
}

export const Step4SwipeCards: React.FC<Step4Props> = ({
  candidates,
  config,
  selectedRecipes,
  setSelectedRecipes,
  onNext,
  onBack,
  onOpenRecipeDetail
}) => {
  const targetSlots = config.days * config.mealsPerDay;
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentRecipe = candidates[currentIndex % candidates.length];

  const handleSwipeRight = () => {
    if (!currentRecipe) return;
    // Add to selected
    setSelectedRecipes([...selectedRecipes, currentRecipe]);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSwipeLeft = () => {
    // Skip
    setCurrentIndex((prev) => prev + 1);
  };

  const handleResetSelections = () => {
    setSelectedRecipes([]);
    setCurrentIndex(0);
  };

  const isSelectionDone = selectedRecipes.length >= targetSlots;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-emerald-200 uppercase">
            Langkah 4 dari 7 • AI Recipe Generation & Swipe
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-1">
            Pilih Resep Favorit Anda
          </h2>
          <p className="text-sm text-emerald-100 mt-1 max-w-xl">
            Swipe Right (Pilih) atau Swipe Left (Lewati) untuk memilih menu harian Anda.
          </p>
        </div>

        {/* Counter Badge */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center shrink-0">
          <span className="text-[11px] font-bold text-emerald-100 uppercase tracking-wider block">
            Progress Terpilih
          </span>
          <div className="text-2xl font-black mt-0.5 text-white">
            {selectedRecipes.length} <span className="text-sm font-semibold opacity-80">/ {targetSlots} Menu</span>
          </div>
        </div>
      </div>

      {/* Main Swipe Deck Container */}
      <div className="max-w-md mx-auto relative">
        {currentRecipe && !isSelectionDone ? (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl transition-all duration-300 flex flex-col">
            {/* Image Header */}
            <div className="relative h-64 w-full bg-slate-900">
              <img
                src={currentRecipe.image}
                alt={currentRecipe.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-900/80 text-white text-xs font-bold backdrop-blur-md">
                  {currentRecipe.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-extrabold line-clamp-1">{currentRecipe.name}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-200 mt-1 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {currentRecipe.cookingTime} Menit
                  </span>
                  <span className="flex items-center gap-1">
                    <Utensils className="w-3.5 h-3.5 text-emerald-400" />
                    {currentRecipe.portion}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenRecipeDetail(currentRecipe)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                title="Lihat Detail Lengkap"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>

            {/* Recipe Content */}
            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {currentRecipe.description}
              </p>

              {/* Savings & Cost Pill */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Biaya Memasak
                  </span>
                  <span className="text-lg font-black text-emerald-600">
                    Rp{currentRecipe.estimatedCost.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block flex items-center justify-end gap-0.5">
                    <TrendingDown className="w-3 h-3" /> Potensi Hemat
                  </span>
                  <span className="text-sm font-extrabold text-slate-900">
                    Rp{currentRecipe.savings.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Key Ingredients */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Bahan Utama:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentRecipe.ingredients.slice(0, 4).map((ing, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
                    >
                      {ing.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleSwipeLeft}
                  className="py-3 px-4 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 border border-rose-200 transition-all active:scale-95"
                >
                  <X className="w-5 h-5" />
                  Lewati (Pass)
                </button>

                <button
                  type="button"
                  onClick={handleSwipeRight}
                  className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all active:scale-95"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  Pilih Menu
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* All target slots filled or completed */
          <div className="bg-emerald-950 text-white rounded-3xl p-8 border border-emerald-800 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold">Rangkaian Menu Terpenuhi!</h3>
              <p className="text-xs text-emerald-200 mt-2">
                Anda telah memilih {selectedRecipes.length} resep untuk durasi {config.days} hari. Siap melakukan optimasi budget?
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={onNext}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Lanjut Optimasi Budget (Step 5)</span>
                <Sparkles className="w-5 h-5" />
              </button>

              <button
                onClick={handleResetSelections}
                className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Ulangi Pemilihan Resep
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Selected Recipes List Preview */}
      {selectedRecipes.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Resep yang Sudah Terpilih ({selectedRecipes.length}/{targetSlots}):
          </h4>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {selectedRecipes.map((recipe, index) => (
              <div
                key={index}
                className="w-48 bg-slate-50 rounded-2xl p-3 border border-slate-200 shrink-0 flex flex-col justify-between"
              >
                <div>
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-24 object-cover rounded-xl"
                  />
                  <h5 className="text-xs font-bold text-slate-900 mt-2 line-clamp-1">
                    {recipe.name}
                  </h5>
                  <span className="text-[10px] text-emerald-600 font-bold block">
                    Rp{recipe.estimatedCost.toLocaleString('id-ID')}
                  </span>
                </div>
                <button
                  onClick={() =>
                    setSelectedRecipes(selectedRecipes.filter((_, i) => i !== index))
                  }
                  className="text-[10px] text-rose-500 font-bold hover:underline mt-2 self-start"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl flex items-center gap-2 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>

        {selectedRecipes.length > 0 && (
          <button
            onClick={onNext}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all"
          >
            <span>Lanjut Evaluasi Budget</span>
            <Sparkles className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
