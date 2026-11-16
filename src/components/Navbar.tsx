import React from 'react';
import { ChefHat, Sparkles, CalendarCheck, Store, BookOpen } from 'lucide-react';

interface NavbarProps {
  activeTab: 'recipes' | 'planner' | 'saved';
  setActiveTab: (tab: 'recipes' | 'planner' | 'saved') => void;
  savedPlansCount: number;
  onOpenPricesModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedPlansCount,
  onOpenPricesModal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => setActiveTab('recipes')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                Dapur<span className="text-emerald-600">Kos</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                  Jogja MVP
                </span>
              </span>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Smart Meal Planning & Student Financial Optimization
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('recipes')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'recipes'
                  ? 'bg-slate-100 text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden md:inline">Resep Rekomendasi</span>
              <span className="md:hidden">Resep</span>
            </button>

            <button
              onClick={() => setActiveTab('planner')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'planner'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>AI Meal Planner</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'saved'
                  ? 'bg-slate-100 text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span className="hidden md:inline">Meal Plan Saya</span>
              {savedPlansCount > 0 && (
                <span className="ml-0.5 px-2 py-0.5 text-xs font-bold bg-emerald-600 text-white rounded-full">
                  {savedPlansCount}
                </span>
              )}
            </button>

            {/* Price Info Button */}
            <button
              onClick={onOpenPricesModal}
              title="Database Harga Pasar Yogyakarta"
              className="flex items-center gap-1.5 ml-1 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
            >
              <Store className="w-4 h-4 text-emerald-600" />
              <span className="hidden lg:inline">Pasar Jogja</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
