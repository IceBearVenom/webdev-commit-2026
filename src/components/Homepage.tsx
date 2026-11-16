import React, { useState } from 'react';
import { RECIPES_DATA } from '../data/recipes';
import { RecipeCard } from './RecipeCard';
import { RecipeDetailModal } from './RecipeDetailModal';
import { SavedMealPlansSection } from './SavedMealPlansSection';
import { Recipe } from '../types';
import { Search, Sparkles, TrendingDown, ChefHat, Filter, ArrowRight, ShieldCheck, Wallet, CheckCircle2 } from 'lucide-react';

interface HomepageProps {
  onStartPlanner: () => void;
}

export const Homepage: React.FC<HomepageProps> = ({ onStartPlanner }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedRecipeForModal, setSelectedRecipeForModal] = useState<Recipe | null>(null);

  const categories = [
    'Semua',
    'Nasi & Olahan Utuh',
    'Olahan Telur',
    'Olahan Tempe & Tahu',
    'Tumisan Sayur',
    'Mi & Pasta',
    'Sup & Kuah',
    'Olahan Ayam & Daging'
  ];

  const filteredRecipes = RECIPES_DATA.filter((recipe) => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(search.toLowerCase()) ||
      recipe.description.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.some((i) => i.name.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'Semua' || recipe.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 animate-fadeIn pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Platform Optimasi Keuangan & Menu Anak Kos #1 di Jogja</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Makan Enak, <span className="text-emerald-400">Hemat Maksimal</span>, Tanpa Kantong Bolos.
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            DapurKos membantu mahasiswa menyusun rencana memasak harian (1-7 hari) berdasar peralatan, sisa bahan, & budget. Didukung database harga pasar rata-rata Yogyakarta.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onStartPlanner}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-xl shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-5 h-5" />
              <span>Mulai AI Meal Planner (7 Hari)</span>
            </button>

            <a
              href="#resep-rekomendasi"
              className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/10 transition-colors flex items-center gap-2"
            >
              <span>Jelajahi Resep Hemat</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Quick Value Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>20 Resep Khas Anak Kos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Hemat hingga 50% vs Beli Luar</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Tanpa Akun (Simpan Lokal)</span>
            </div>
          </div>
        </div>

        {/* Decorative Background Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Saved Meal Plans Section (PRD Step 8) */}
      <SavedMealPlansSection onStartNewPlan={onStartPlanner} />

      {/* Main Section: Recipe Recommendations (PRD Section 4.1) */}
      <section id="resep-rekomendasi" className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
              <ChefHat className="w-7 h-7 text-emerald-600" />
              Resep Rekomendasi
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Pilihan menu ekonomis cepat saji untuk anak kos di Yogyakarta.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Cari resep, bahan, atau kata kunci..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-xs"
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recipes Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSelect={(r) => setSelectedRecipeForModal(r)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <Filter className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">Resep Tidak Ditemukan</h3>
            <p className="text-xs text-slate-500">
              Tidak ada resep yang cocok dengan kata kunci "{search}". Coba kata kunci lain atau pilih kategori "Semua".
            </p>
          </div>
        )}
      </section>

      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        recipe={selectedRecipeForModal}
        onClose={() => setSelectedRecipeForModal(null)}
      />
    </div>
  );
};
