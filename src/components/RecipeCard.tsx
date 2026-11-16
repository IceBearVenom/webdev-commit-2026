import React from 'react';
import { Clock, TrendingDown, ChevronRight, Utensils } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(recipe)}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {/* Category & Difficulty Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-900/80 text-white backdrop-blur-md">
            {recipe.category}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-white/90 text-slate-800 backdrop-blur-md shadow-xs">
            ⚡ {recipe.difficulty}
          </span>
        </div>

        {/* Savings Badge */}
        <div className="absolute bottom-3 left-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 shadow-md">
          <TrendingDown className="w-3.5 h-3.5" />
          Hemat Rp{recipe.savings.toLocaleString('id-ID')}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
            {recipe.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {recipe.description}
          </p>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 mt-4 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{recipe.cookingTime} menit</span>
            </div>
            <div className="flex items-center gap-1">
              <Utensils className="w-4 h-4 text-slate-400" />
              <span>{recipe.portion}</span>
            </div>
          </div>
        </div>

        {/* Financial Comparison Box */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Biaya Masak
            </span>
            <span className="text-lg font-extrabold text-emerald-600">
              Rp{recipe.estimatedCost.toLocaleString('id-ID')}
            </span>
            <span className="text-xs text-slate-400 line-through ml-2">
              Rp{recipe.outsidePrice.toLocaleString('id-ID')}
            </span>
          </div>

          <button className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
