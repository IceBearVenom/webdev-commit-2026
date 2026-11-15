import { useMemo } from 'react';
import { RECIPES_DB } from '../../data/recipes';
import { calculateRecipeMetrics } from '../../utils/calculations';
import { formatRupiah, placeholderImage } from '../../utils/format';
import { FallbackImg } from '../common/FallbackImg';

interface RecipeModalProps {
  recipeId: string | null;
  onClose: () => void;
}

export function RecipeModal({ recipeId, onClose }: RecipeModalProps) {
  const rec = useMemo(() => {
    const raw = RECIPES_DB.find((r) => r.id === recipeId);
    return raw ? calculateRecipeMetrics(raw) : null;
  }, [recipeId]);

  if (!rec) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header image */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-200">
          <FallbackImg
            src={rec.image}
            alt="Foto Masakan"
            fallbackSrc={placeholderImage('Resep DapurKos', 800, 400)}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
          <div className="absolute bottom-3 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-white/95 text-slate-800 text-xs font-bold shadow-sm">
              {rec.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-sm">
              {rec.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900/80 text-white text-xs font-medium">
              <i className="fa-regular fa-clock mr-1"></i>
              {rec.cookingTime} menit
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">{rec.name}</h2>
            <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{rec.description}</p>
          </div>

          {/* Savings box */}
          <div className="grid grid-cols-3 gap-2.5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-center">
            <div>
              <span className="text-[11px] text-slate-500 block">Biaya Masak</span>
              <span className="text-sm sm:text-base font-extrabold text-slate-900">{formatRupiah(rec.cookCost)}</span>
            </div>
            <div className="border-x border-emerald-200">
              <span className="text-[11px] text-slate-500 block">Beli di Luar</span>
              <span className="text-sm sm:text-base font-bold text-slate-500 line-through">
                {formatRupiah(rec.outsidePrice)}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-emerald-700 font-semibold block">Potensi Hemat</span>
              <span className="text-sm sm:text-base font-extrabold text-emerald-700">{formatRupiah(rec.savings)}</span>
            </div>
          </div>

          {/* Equipment */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <i className="fa-solid fa-fire-burner text-emerald-600"></i>
              <span>Peralatan yang Dibutuhkan</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {rec.equipment.map((eq) => (
                <span key={eq} className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
                  <i className="fa-solid fa-check text-emerald-600 mr-1"></i>
                  {eq}
                </span>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <i className="fa-solid fa-carrot text-amber-500"></i>
                <span>Daftar Bahan &amp; Estimasi Biaya Pakai</span>
              </h3>
              <span className="text-[11px] text-slate-400">Ref. Pasar Jogja</span>
            </div>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl px-4 py-1 bg-slate-50/50">
              {rec.detailedIngredients.map((ing) => (
                <div key={ing.name} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-medium text-slate-800">
                    {ing.name}{' '}
                    <span className="text-slate-400">
                      ({ing.qty} {ing.unit})
                    </span>
                  </span>
                  <span className="font-bold text-slate-700">{formatRupiah(ing.estimatedCost)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <i className="fa-solid fa-list-ol text-emerald-600"></i>
              <span>Langkah-Langkah Memasak</span>
            </h3>
            <ol className="space-y-2.5 text-sm text-slate-700 list-decimal list-inside">
              {rec.instructions.map((step, idx) => (
                <li key={idx} className="pl-1 leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
