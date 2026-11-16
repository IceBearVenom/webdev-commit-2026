import { useEffect, useMemo } from 'react';
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

  useEffect(() => {
    if (!recipeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [recipeId, onClose]);

  if (!rec) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={rec.name}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-(--primary-dark)/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-(--primary-light) rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-(--secondary-light)">
        {/* Header image */}
        <div className="relative h-56 sm:h-64 w-full bg-(--secondary-light)">
          <FallbackImg
            src={rec.image}
            alt={rec.name}
            fallbackSrc={placeholderImage('Resep DapurKos', 800, 400)}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-(--primary-dark)/70 hover:bg-(--primary-light) text-white hover:text-(--primary-dark) flex items-center justify-center transition"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
          <div className="absolute bottom-3 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-(--primary-light)/95 text-(--primary-dark) text-xs font-bold shadow-sm">
              {rec.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-(--primary) text-white text-xs font-bold shadow-sm">
              {rec.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full bg-(--primary-dark)/80 text-white text-xs font-medium">
              <i className="fa-regular fa-clock mr-1"></i>
              {rec.cookingTime} menit
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-(--primary-dark)">{rec.name}</h2>
            <p className="text-sm text-(--secondary-dark) mt-1.5 leading-relaxed">{rec.description}</p>
          </div>

          {/* Savings box */}
          <div className="grid grid-cols-3 gap-2.5 p-4 rounded-2xl bg-(--primary)/10 border border-(--primary)/30 text-center">
            <div>
              <span className="text-[11px] text-(--primary-dark)-500 block">Biaya Masak</span>
              <span className="text-sm sm:text-base font-extrabold text-(--primary-dark)">{formatRupiah(rec.cookCost)}</span>
            </div>
            <div className="border-x border-(--primary)/30">
              <span className="text-[11px] text-(--primary-dark)-500 block">Beli di Luar</span>
              <span className="text-sm sm:text-base font-bold text-(--primary-dark)-500 line-through">
                {formatRupiah(rec.outsidePrice)}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-(--primary) font-semibold block">Potensi Hemat</span>
              <span className="text-sm sm:text-base font-extrabold text-(--primary)">{formatRupiah(rec.savings)}</span>
            </div>
          </div>

          {/* Equipment */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-(--primary-dark) flex items-center gap-2">
              <i className="fa-solid fa-fire-burner text-(--primary)"></i>
              <span>Peralatan yang Dibutuhkan</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {rec.equipment.map((eq) => (
                <span key={eq} className="px-3 py-1 rounded-xl bg-(--primary) text-(--primary-light) text-xs font-semibold">
                  <i className="fa-solid fa-check mr-1"></i>
                  {eq}
                </span>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-(--primary-dark) flex items-center gap-2">
                <i className="fa-solid fa-carrot text-amber-500"></i>
                <span>Daftar Bahan &amp; Estimasi Biaya Pakai</span>
              </h3>
              <span className="text-[11px] text-(--primary-dark)-400">Ref. Pasar Jogja</span>
            </div>
            <div className="divide-y divide-(--primary-dark)-100 border border-(--primary-dark)-200 rounded-2xl px-4 py-1 bg-(--primary-dark)-50/50">
              {rec.detailedIngredients.map((ing) => (
                <div key={ing.name} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-medium text-(--primary-dark)-800">
                    {ing.name}{' '}
                    <span className="text-(--primary-dark)-400">
                      ({ing.qty} {ing.unit})
                    </span>
                  </span>
                  <span className="font-bold text-(--primary-dark)-700">{formatRupiah(ing.estimatedCost)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-bold text-(--primary-dark) flex items-center gap-2">
              <i className="fa-solid fa-list-ol text-(--primary)"></i>
              <span>Langkah-Langkah Memasak</span>
            </h3>
            <ol className="space-y-2.5 text-sm text-(--primary-dark)-700 list-decimal list-inside">
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
