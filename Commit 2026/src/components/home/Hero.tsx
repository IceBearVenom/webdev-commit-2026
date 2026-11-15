import { HERO_SLIDES } from '../../data/heroSlides';
import { FallbackImg } from '../common/FallbackImg';
import { placeholderImage } from '../../utils/format';

interface HeroProps {
  slideIndex: number;
  onSelectSlide: (index: number) => void;
  onOpenRecipe: (recipeId: string) => void;
  onStartPlanner: () => void;
}

export function Hero({ slideIndex, onSelectSlide, onOpenRecipe, onStartPlanner }: HeroProps) {
  const count = HERO_SLIDES.length;
  const select = (i: number) => onSelectSlide((i + count) % count);
  const slide = HERO_SLIDES[slideIndex];

  return (
    <div className="relative overflow-hidden bg-[#e6e9e6] text-slate-900 min-h-[calc(100dvh-4rem)] flex flex-col">
      {/* Decorative plate line art */}
      <div className="pointer-events-none absolute -right-16 -bottom-16 w-80 h-80 rounded-full border-[24px] border-slate-400/10 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full border-2 border-dashed border-slate-400/20"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-10">
      {/* Top micro-navigation */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4 sm:gap-6 font-semibold tracking-wide">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.tabLabel}
              type="button"
              onClick={() => select(idx)}
              className={
                idx === slideIndex
                  ? 'text-slate-900 line-through decoration-2 decoration-emerald-700 transition'
                  : 'text-slate-500 hover:text-slate-900 transition'
              }
            >
              {s.tabLabel}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-600 mr-2">
            <i className="fa-solid fa-location-dot text-emerald-700"></i>
            Pasar Jogja • Update 13 Nov 2026
          </span>
          <button
            type="button"
            onClick={() => select(slideIndex - 1)}
            aria-label="Menu Sebelumnya"
            className="w-8 h-8 rounded-full border border-slate-400/60 hover:border-slate-800 text-slate-700 hover:text-slate-950 flex items-center justify-center transition"
          >
            <i className="fa-solid fa-chevron-left text-[10px]"></i>
          </button>
          <button
            type="button"
            onClick={() => select(slideIndex + 1)}
            aria-label="Menu Berikutnya"
            className="w-8 h-8 rounded-full border border-slate-400/60 hover:border-slate-800 text-slate-700 hover:text-slate-950 flex items-center justify-center transition"
          >
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
          </button>
          <button
            type="button"
            onClick={onStartPlanner}
            title="Mulai AI Meal Planner"
            className="w-8 h-8 rounded-full bg-[#243b4a] hover:bg-emerald-700 text-white flex items-center justify-center shadow-sm transition"
          >
            <i className="fa-solid fa-wand-magic-sparkles text-xs"></i>
          </button>
        </div>
      </div>

      {/* Showcase grid */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 items-center content-center gap-8 my-6 sm:my-8">
        {/* Left: numbered selector */}
        <div className="lg:col-span-3 flex lg:flex-col justify-center lg:justify-start gap-4 sm:gap-6 order-2 lg:order-1">
          {HERO_SLIDES.map((s, idx) => {
            const active = idx === slideIndex;
            return (
              <button
                key={s.recipeId}
                type="button"
                onClick={() => select(idx)}
                className={`group flex items-center gap-3 text-left transition ${
                  active ? 'opacity-100' : 'opacity-45 hover:opacity-80'
                }`}
              >
                <span
                  className={`text-2xl sm:text-4xl font-black tracking-tighter transition ${
                    active ? 'text-[#243b4a]' : 'text-slate-400'
                  }`}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <img
                  src={s.image.replace('w=800', 'w=200')}
                  alt={s.titleLines.join(' ')}
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover transition ${
                    active ? 'ring-2 ring-[#243b4a] shadow-md' : 'ring-1 ring-slate-300 shadow-sm'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Center: plate + wordmark */}
        <div className="lg:col-span-6 relative flex items-center justify-center order-1 lg:order-2 py-2">
          <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-white p-2.5 shadow-2xl shadow-slate-900/15 transition-all duration-500">
            <FallbackImg
              src={slide.image}
              alt="Menu Unggulan Anak Kos"
              fallbackSrc={placeholderImage('DapurKos', 600, 600)}
              className="w-full h-full object-cover rounded-full transition-all duration-500"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
            <span className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[0.28em] text-white uppercase drop-shadow-[0_4px_16px_rgba(15,23,42,0.35)] pl-[0.28em] text-center">
              {slide.word}
            </span>
          </div>
        </div>

        {/* Right: copy + actions */}
        <div className="lg:col-span-3 flex flex-col items-center lg:items-end text-center lg:text-right space-y-3 order-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{slide.kicker}</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#243b4a] leading-tight">
            {slide.titleLines[0]}
            <br />
            {slide.titleLines[1]}
          </h1>
          <p className="text-xs text-slate-600 max-w-xs leading-relaxed">
            {slide.metaBefore}
            <strong>{slide.metaHighlight}</strong>
            {slide.metaAfter}
          </p>
          <div className="pt-2 flex flex-wrap justify-center lg:justify-end gap-2">
            <button
              type="button"
              onClick={onStartPlanner}
              className="px-5 py-2.5 rounded-full bg-[#243b4a] hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
            >
              <i className="fa-solid fa-robot"></i>
              <span>Mulai AI Planner</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenRecipe(slide.recipeId)}
              className="px-4 py-2.5 rounded-full bg-white/80 hover:bg-white text-slate-800 border border-slate-300 font-semibold text-xs transition"
            >
              Lihat Resep
            </button>
          </div>
        </div>
      </div>

        {/* Scroll cue */}
        <div className="relative z-20 flex justify-center">
          <button
            type="button"
            onClick={() => document.getElementById('resep-section')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Lihat resep"
            className="w-10 h-10 rounded-full border border-slate-400/60 hover:border-slate-800 text-slate-700 flex items-center justify-center transition animate-bounce"
          >
            <i className="fa-solid fa-chevron-down text-xs"></i>
          </button>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#243b4a]"></div>
    </div>
  );
}
