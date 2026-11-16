import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Homepage } from './components/Homepage';
import { MealPlannerWizard } from './components/MealPlannerWizard';
import { SavedMealPlansSection } from './components/SavedMealPlansSection';
import { YogyakartaPricesModal } from './components/YogyakartaPricesModal';
import { getSavedMealPlans } from './services/storage';
import { ChefHat, Heart, MapPin } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recipes' | 'planner' | 'saved'>('recipes');
  const [isPricesModalOpen, setIsPricesModalOpen] = useState(false);

  const savedCount = getSavedMealPlans().length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedPlansCount={savedCount}
        onOpenPricesModal={() => setIsPricesModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'recipes' && (
          <Homepage onStartPlanner={() => setActiveTab('planner')} />
        )}

        {activeTab === 'planner' && (
          <MealPlannerWizard
            onPlanFinishedAndSaved={() => setActiveTab('saved')}
          />
        )}

        {activeTab === 'saved' && (
          <div className="max-w-6xl mx-auto">
            <SavedMealPlansSection onStartNewPlan={() => setActiveTab('planner')} />
          </div>
        )}
      </main>

      {/* Yogyakarta Market Price Reference Modal */}
      <YogyakartaPricesModal
        isOpen={isPricesModalOpen}
        onClose={() => setIsPricesModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <span className="text-white font-black text-lg">DapurKos</span>
              <p className="text-xs text-slate-500">
                Smart Meal Planning & Student Financial Optimization • Yogyakarta MVP 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400 font-semibold">
            <span className="flex items-center gap-1 text-emerald-400">
              <MapPin className="w-3.5 h-3.5" /> Pasar Yogyakarta (Nov 2026)
            </span>
            <span>Eat Better, Spend Smarter, Live Better.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
