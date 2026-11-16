import { useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import type { ScoredRecipe } from '../../types';
import { formatRupiah, placeholderImage } from '../../utils/format';
import { FallbackImg } from '../common/FallbackImg';

export type SwipeDirection = 'left' | 'right';

const SWIPE_THRESHOLD = 95; // px dragged before a release counts as a swipe
const FLICK_VELOCITY = 0.5; // px/ms: a quick flick also counts, even over a short distance
const FLICK_MIN_DISTANCE = 40;
const EXIT_MS = 240; // keep in sync with the timeout in Step4Swipe

interface SwipeCardProps {
  recipe: ScoredRecipe;
  ownedNames: string[];
  exiting: SwipeDirection | null;
  onDecide: (direction: SwipeDirection) => void;
}

export function SwipeCard({ recipe: rec, ownedNames, exiting, onDecide }: SwipeCardProps) {
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const activePointer = useRef<number | null>(null);
  const startX = useRef(0);
  const lastX = useRef(0);
  const lastT = useRef(0);
  const velocity = useRef(0);

  // Pointer events + pointer capture: one code path for mouse, touch and pen, and the drag keeps
  // tracking even when the pointer leaves the card or the window.
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (exiting || activePointer.current !== null) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    activePointer.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
    startX.current = lastX.current = e.clientX;
    lastT.current = performance.now();
    velocity.current = 0;
    setDragging(true);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerId !== activePointer.current) return;
    const now = performance.now();
    const dt = now - lastT.current;
    if (dt > 0) velocity.current = (e.clientX - lastX.current) / dt;
    lastX.current = e.clientX;
    lastT.current = now;
    setDragX(e.clientX - startX.current);
  };

  const finishDrag = (e: PointerEvent<HTMLDivElement>, cancelled: boolean) => {
    if (e.pointerId !== activePointer.current) return;
    activePointer.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    setDragging(false);

    const dx = e.clientX - startX.current;
    // Ignore stale velocity if the pointer paused before release.
    const v = performance.now() - lastT.current < 80 ? velocity.current : 0;
    const flicked = Math.abs(v) > FLICK_VELOCITY && Math.abs(dx) > FLICK_MIN_DISTANCE;

    if (!cancelled && (dx > SWIPE_THRESHOLD || (flicked && dx > 0))) onDecide('right');
    else if (!cancelled && (dx < -SWIPE_THRESHOLD || (flicked && dx < 0))) onDecide('left');
    else setDragX(0); // snap back (animated by the CSS transition now that .dragging is gone)
  };

  const likeOpacity = dragX > 30 ? Math.min(1, (dragX - 30) / 80) : 0;
  const nopeOpacity = dragX < -30 ? Math.min(1, (-dragX - 30) / 80) : 0;

  const matchedCount = rec.ingredients.filter((i) => ownedNames.includes(i.name.toLowerCase())).length;

  const animClass = exiting === 'right' ? 'swipe-right-anim' : exiting === 'left' ? 'swipe-left-anim' : '';

  const style: CSSProperties = {};
  if (dragX !== 0) {
    style.transform = `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`;
    if (dragging) style.willChange = 'transform';
  }
  // Make the fly-off finish within the time Step4Swipe keeps the card mounted.
  if (exiting) style.transition = `transform ${EXIT_MS}ms ease-in, opacity ${EXIT_MS}ms ease-in`;

  return (
    <div
      className={`swipe-card ${dragging ? 'dragging' : ''} ${animClass} w-full bg-(--primary-light) rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative cursor-grab active:cursor-grabbing`}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={(e) => finishDrag(e, false)}
      onPointerCancel={(e) => finishDrag(e, true)}
    >
      {/* Stamps */}
      <div
        className="badge-stamp pointer-events-none absolute top-6 left-6 z-20 px-4 py-1.5 rounded-xl border-4 border-(--primary) text-(--primary) font-black text-xl uppercase -rotate-12 bg-(--primary-light)/90"
        style={{ opacity: likeOpacity }}
      >
        PILIH
      </div>
      <div
        className="badge-stamp pointer-events-none absolute top-6 right-6 z-20 px-4 py-1.5 rounded-xl border-4 border-rose-500 text-rose-500 font-black text-xl uppercase rotate-12 bg-(--primary-light)/90"
        style={{ opacity: nopeOpacity }}
      >
        LEWATI
      </div>

      <div className="relative h-52 bg-(--primary-light)">
        <FallbackImg
          src={rec.image}
          alt={rec.name}
          fallbackSrc={placeholderImage(rec.name, 600, 400)}
          className="w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-(--primary-light)/75 via-transparent to-transparent"></div>
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-(--primary-dark)">
          <div>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-(--primary) text-(--primary-light)">{rec.category}</span>
            <h3 className="text-xl font-extrabold mt-1 leading-tight">{rec.name}</h3>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <p className="text-xs sm:text-sm text-(--secondary-dark) line-clamp-2">{rec.description}</p>

        <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-(--primary-light) border border-slate-100 text-center">
          <div>
            <span className="text-[10px] text-slate-400 block">Biaya Masak</span>
            <span className="text-sm font-extrabold text-(--primary-dark)">{formatRupiah(rec.cookCost)}</span>
          </div>
          <div className="border-x border-slate-200">
            <span className="text-[10px] text-slate-400 block">Waktu</span>
            <span className="text-sm font-bold text-(--secondary-dark)">{rec.cookingTime} mnt</span>
          </div>
          <div>
            <span className="text-[10px] text-(--primary) block font-semibold">Hemat</span>
            <span className="text-sm font-extrabold text-(--primary)">{formatRupiah(rec.savings)}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Bahan Utama:</span>
          <div className="flex flex-wrap gap-1.5">
            {rec.ingredients.slice(0, 4).map((ing) => {
              const isOwned = ownedNames.includes(ing.name.toLowerCase());
              return (
                <span
                  key={ing.name}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-medium ${
                    isOwned ? 'bg-(--primary)/20 text-(--primary-dark)' : 'bg-(--primary-light) text-(--secondary-dark)'
                  }`}
                >
                  {isOwned && <i className="fa-solid fa-check mr-1"></i>}
                  {ing.name}
                </span>
              );
            })}
          </div>
          {matchedCount > 0 && (
            <p className="text-[11px] text-(--primary) font-medium pt-0.5">
              <i className="fa-solid fa-wand-magic-sparkles mr-1"></i>
              Memanfaatkan {matchedCount} bahan yang sudah kamu punya!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}