import React from 'react';
import { X, Clock, ChefHat, Wallet, ShoppingBag, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto border border-slate-100">
        {/* Header with image */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-900 shrink-0">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 flex items-center justify-center backdrop-blur-md transition-colors border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Stats */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-bold bg-emerald-500 text-white rounded-full">
                {recipe.category}
              </span>
              <span className="px-3 py-1 text-xs font-bold bg-white/20 text-white backdrop-blur-md rounded-full">
                ⚡ {recipe.difficulty}
              </span>
              <span className="px-3 py-1 text-xs font-bold bg-amber-500/90 text-white rounded-full flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {recipe.cookingTime} Menit
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {recipe.name}
            </h2>
            <p className="text-sm text-slate-300 mt-1 line-clamp-2 font-medium">
              {recipe.description}
            </p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Savings Calculation Highlight Box (PRD Section 4.1) */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-lg shadow-emerald-500/10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider block">
                  Potensi Penghematan Finansial
                </span>
                <div className="text-2xl sm:text-3xl font-black mt-0.5">
                  Rp{recipe.savings.toLocaleString('id-ID')}
                  <span className="text-xs font-normal text-emerald-100 ml-2">/ {recipe.portion}</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-xs space-y-1">
                <div className="flex justify-between gap-4">
                  <span className="text-emerald-100">Harga Makanan di Luar:</span>
                  <span className="font-bold">Rp{recipe.outsidePrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-emerald-100">Biaya Memasak Sendiri:</span>
                  <span className="font-bold text-amber-300">Rp{recipe.estimatedCost.toLocaleString('id-ID')}</span>
                </div>
                <div className="border-t border-white/20 pt-1 flex justify-between gap-4 font-bold text-emerald-200">
                  <span>Rumus PRD:</span>
                  <span>Beli Luar - Biaya Masak</span>
                </div>
              </div>
            </div>
          </div>

          {/* Equipment Needed */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-3">
              <ChefHat className="w-4 h-4 text-emerald-600" />
              Peralatan Dapur yang Dibutuhkan
            </h4>
            <div className="flex flex-wrap gap-2">
              {recipe.equipment.map((eq, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/60 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {eq}
                </span>
              ))}
            </div>
          </div>

          {/* Ingredients & Cost Breakdown */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-3">
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              Daftar Bahan & Estimasi Pemakaian
            </h4>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
              {recipe.ingredients.map((ing, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs sm:text-sm py-1.5 border-b border-slate-200/50 last:border-0"
                >
                  <span className="font-semibold text-slate-800 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {ing.name} ({ing.quantity} {ing.unit})
                  </span>
                  <div className="text-right">
                    <span className="font-bold text-slate-900">
                      Rp{ing.estimatedCost.toLocaleString('id-ID')}
                    </span>
                    {ing.packageSize && (
                      <span className="text-[10px] text-slate-400 block">
                        Kemasan: {ing.packageSize} (~Rp{ing.packagePrice?.toLocaleString('id-ID')})
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div className="pt-2 flex justify-between items-center text-xs text-slate-500 italic">
                <span className="flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                  Biaya dihitung berdasarkan takaran pemakaian resep (Pasar Yogyakarta Nov 2026).
                </span>
              </div>
            </div>
          </div>

          {/* Cooking Steps */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-3">
              <ArrowRight className="w-4 h-4 text-emerald-600" />
              Langkah-Langkah Memasak Praktis
            </h4>
            <div className="space-y-3">
              {recipe.instructions.map((step, index) => (
                <div key={index} className="flex gap-3 text-sm text-slate-700">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-extrabold text-xs flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <p className="pt-0.5 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors shadow-xs"
          >
            Tutup Detail
          </button>
        </div>
      </div>
    </div>
  );
};
