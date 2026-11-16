import React, { useState } from 'react';
import { Recipe, MealPlanConfig, BudgetOptimizationSuggestion } from '../../types';
import { evaluateBudgetOptimization } from '../../services/mealPlannerEngine';
import { AlertTriangle, CheckCircle, Sparkles, ArrowLeft, ArrowRight, ShieldCheck, DollarSign } from 'lucide-react';

interface Step5Props {
  selectedRecipes: Recipe[];
  config: MealPlanConfig;
  onNext: () => void;
  onBack: () => void;
}

export const Step5BudgetOptimization: React.FC<Step5Props> = ({
  selectedRecipes,
  config,
  onNext,
  onBack
}) => {
  const evaluation = evaluateBudgetOptimization(selectedRecipes, config);
  const [suggestions, setSuggestions] = useState<BudgetOptimizationSuggestion[]>(
    evaluation.suggestions.map((s) => ({ ...s, applied: true }))
  );

  const toggleSuggestion = (index: number) => {
    setSuggestions(
      suggestions.map((s, i) => (i === index ? { ...s, applied: !s.applied } : s))
    );
  };

  const totalOptimizedSavings = suggestions
    .filter((s) => s.applied)
    .reduce((sum, s) => sum + s.savingsAmount, 0);

  const adjustedCost = Math.max(0, evaluation.totalEstimatedCost - totalOptimizedSavings);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <span className="text-xs font-bold tracking-widest text-emerald-200 uppercase">
          Langkah 5 dari 7 • Budget Optimization
        </span>
        <h2 className="text-2xl sm:text-3xl font-black mt-1">
          Evaluasi & Optimasi Finansial AI
        </h2>
        <p className="text-sm text-emerald-100 mt-2 max-w-2xl leading-relaxed">
          Sistem menganalisis seluruh resep yang Anda pilih untuk memastikan total pengeluaran tetap berada dalam budget & memaksimalkan penggunaan bahan bersama.
        </p>
      </div>

      {/* Financial Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Budget */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Target Budget Anda
          </span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">
            Rp{config.budget.toLocaleString('id-ID')}
          </span>
          <span className="text-xs text-slate-500 font-medium mt-1 block">
            Untuk {config.days} Hari Memasak
          </span>
        </div>

        {/* Total Estimated Cost */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Estimasi Pemakaian Bahan
          </span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">
            Rp{adjustedCost.toLocaleString('id-ID')}
          </span>
          {evaluation.isOverBudget && (
            <span className="text-xs font-bold text-amber-600 mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Over budget awal
            </span>
          )}
        </div>

        {/* Budget Status Badge */}
        <div
          className={`rounded-3xl p-5 border shadow-xs flex flex-col justify-between ${
            adjustedCost <= config.budget
              ? 'bg-emerald-500 text-white border-emerald-400'
              : 'bg-amber-500 text-white border-amber-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">
              Status Kesesuaian Budget
            </span>
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-xl font-black mt-2">
            {adjustedCost <= config.budget
              ? '✅ Budget Sesuai & Safe'
              : '⚠️ Melebihi Budget'}
          </div>
          <span className="text-xs opacity-90">
            {adjustedCost <= config.budget
              ? `Sisa Saldo: Rp${(config.budget - adjustedCost).toLocaleString('id-ID')}`
              : `Selisih: +Rp${(adjustedCost - config.budget).toLocaleString('id-ID')}`}
          </span>
        </div>
      </div>

      {/* AI Optimization Suggestions */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            Rekomendasi Optimasi Bahan & Penghematan AI
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Aktifkan rekomendasi di bawah ini untuk menekan pengeluaran belanja bahan masakan:
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {suggestions.map((item, index) => (
            <div
              key={index}
              onClick={() => toggleSuggestion(index)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                item.applied
                  ? 'bg-emerald-50/70 border-emerald-300 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={item.applied}
                  onChange={() => {}}
                  className="mt-1 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-black text-emerald-600 bg-white px-2.5 py-1 rounded-full border border-emerald-200 inline-block shadow-2xs">
                  -Rp{item.savingsAmount.toLocaleString('id-ID')}
                </span>
              </div>
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
          Kembali
        </button>

        <button
          onClick={onNext}
          className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
        >
          <span>Lihat Ringkasan Rencana (Step 6)</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
