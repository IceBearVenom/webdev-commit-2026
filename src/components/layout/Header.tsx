import type { View } from '../../types';
import ThemeToggle from '../common/ThemeToggle';

interface HeaderProps {
  view: View;
  onNavigate: (view: View) => void;
  onStartPlanner: () => void;
}

export function Header({ view, onNavigate, onStartPlanner }: HeaderProps) {
  const homeActive = view === 'home';

  return (
    <header className="sticky top-0 z-40 bg-(--var-primary-light)/60 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="w-10 h-10 rounded-xl bg-(--primary) text-white flex items-center justify-center shadow-sm shadow-(--primary)/20">
            <img src="/LogoDapurKos.svg" alt="DapurKos" className="w-full h-full object-contain p-1.5" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-(--primary-dark)">
              Dapur<span className="text-(--primary)">Kos</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              Yogyakarta Edition
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
              homeActive ? 'text-(--primary) bg-(--primary)/30' : 'text-(--primary) hover:bg-(--secondary)'
            }`}
          >
            <i className="fa-solid fa-house mr-1.5"></i>
            <span className="hidden sm:inline">Beranda</span>
          </button>
          <button
            onClick={onStartPlanner}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-(--primary) hover:bg-(--primary)/85 shadow-sm shadow-(--primary)/20 transition flex items-center gap-1.5"
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            <span>AI Meal Planner</span>
          </button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
