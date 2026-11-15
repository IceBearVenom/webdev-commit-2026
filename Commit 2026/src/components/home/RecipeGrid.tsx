import { useMemo } from 'react';
import { RECIPES_DB } from '../../data/recipes';
import { calculateRecipeMetrics } from '../../utils/calculations';
import { RecipeCard } from './RecipeCard';

const CATEGORIES = ['Semua', ...Array.from(new Set(RECIPES_DB.map((r) => r.category)))];

interface RecipeGridProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenRecipe: (recipeId: string) => void;
}

export function RecipeGrid({ selectedCategory, onSelectCategory, onOpenRecipe }: RecipeGridProps) {
  const recipes = useMemo(() => {
    const filtered =
      selectedCategory === 'Semua' ? RECIPES_DB : RECIPES_DB.filter((r) => r.category === selectedCategory);
    return filtered.map(calculateRecipeMetrics);
  }, [selectedCategory]);

  return (
    <div id="resep-section" className="space-y-5 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Resep Rekomendasi</h2>
          <p className="text-sm text-slate-500 mt-1">
            Menu hemat terverifikasi untuk mahasiswa Yogyakarta lengkap dengan hitungan penghematan.
          </p>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {recipes.map((rec) => (
          <RecipeCard key={rec.id} recipe={rec} onOpen={onOpenRecipe} />
        ))}
      </div>
    </div>
  );
}
