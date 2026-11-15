import { useEffect, useState } from 'react';
import type { PlannerState, SavedMealPlan, View } from './types';
import { useToasts } from './hooks/useToasts';
import { evaluateMealPlanFinancials } from './utils/calculations';
import { createInitialPlannerState } from './utils/plannerState';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/layout/ToastContainer';
import { Hero } from './components/home/Hero';
import { SavedPlans } from './components/home/SavedPlans';
import { RecipeGrid } from './components/home/RecipeGrid';
import { RecipeModal } from './components/recipe/RecipeModal';
import { SavedPlanDetail } from './components/saved/SavedPlanDetail';
import { Planner } from './components/planner/Planner';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [heroIndex, setHeroIndex] = useState(0);
  const [savedPlans, setSavedPlans] = useState<SavedMealPlan[]>([]);
  const [activePlanIndex, setActivePlanIndex] = useState<number | null>(null);
  const [modalRecipeId, setModalRecipeId] = useState<string | null>(null);
  const [planner, setPlanner] = useState<PlannerState>(createInitialPlannerState);
  const { toasts, showToast, dismissToast } = useToasts();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const startMealPlanner = () => {
    setPlanner((prev) => ({
      ...prev,
      step: 1,
      selectedRecipes: [],
      currentSwipeIndex: 0,
      isGenerating: false,
    }));
    setView('planner');
  };

  const savePlan = () => {
    const evalData = evaluateMealPlanFinancials(planner.selectedRecipes, planner.userIngredients, planner.totalBudget);
    const createdAt = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

    const newPlan: SavedMealPlan = {
      id: 'mp-' + Date.now(),
      title: `Rencana Makan Kos #${savedPlans.length + 1}`,
      createdAt,
      durationDays: planner.durationDays,
      frequencyPerDay: planner.frequencyPerDay,
      totalBudget: planner.totalBudget,
      totalUsedCost: evalData.totalUsedCost,
      totalSavings: evalData.totalSavings,
      schedule: planner.generatedSchedule,
    };

    setSavedPlans((prev) => [newPlan, ...prev]);
    showToast('Meal Plan berhasil disimpan dan ditambahkan ke Beranda!', 'success');
    setView('home');
  };

  const deletePlan = (index: number) => {
    setSavedPlans((prev) => prev.filter((_, i) => i !== index));
    showToast('Meal plan berhasil dihapus.', 'info');
  };

  const openPlan = (index: number) => {
    setActivePlanIndex(index);
    setView('saved-detail');
  };

  const activePlan = activePlanIndex !== null ? savedPlans[activePlanIndex] : undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <Header view={view} onNavigate={setView} onStartPlanner={startMealPlanner} />

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {view === 'home' && (
        <Hero
          slideIndex={heroIndex}
          onSelectSlide={setHeroIndex}
          onOpenRecipe={setModalRecipeId}
          onStartPlanner={startMealPlanner}
        />
      )}

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {view === 'home' && (
          <section className="space-y-8">
            <SavedPlans plans={savedPlans} onOpen={openPlan} onDelete={deletePlan} onNew={startMealPlanner} />
            <RecipeGrid
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onOpenRecipe={setModalRecipeId}
            />
          </section>
        )}

        {view === 'planner' && (
          <Planner
            planner={planner}
            setPlanner={setPlanner}
            showToast={showToast}
            onOpenRecipe={setModalRecipeId}
            onCancel={() => setView('home')}
            onSavePlan={savePlan}
          />
        )}

        {view === 'saved-detail' && activePlan && (
          <SavedPlanDetail plan={activePlan} onBack={() => setView('home')} onOpenRecipe={setModalRecipeId} />
        )}
      </main>

      <Footer />

      <RecipeModal recipeId={modalRecipeId} onClose={() => setModalRecipeId(null)} />
    </div>
  );
}
