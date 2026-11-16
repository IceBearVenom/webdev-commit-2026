import { useEffect, useRef, useState } from 'react';
import type { ScoredRecipe } from '../../types';
import { formatRupiah, placeholderImage } from '../../utils/format';
import { FallbackImg } from '../common/FallbackImg';

export type SwipeDirection = 'left' | 'right';

const SWIPE_THRESHOLD = 95;

interface SwipeCardProps {
  recipe: ScoredRecipe;
  ownedNames: string[];
  exiting: SwipeDirection | null;
  onDecide: (direction: SwipeDirection) => void;
}

export function SwipeCard({ recipe: rec, ownedNames, exiting, onDecide }: SwipeCardProps) {
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const dragXRef = useRef(0);
  const onDecideRef = useRef(onDecide);
  onDecideRef.current = onDecide;

  useEffect(() => {
    if (!dragging) return;

    const move = (clientX: number) => {
      const dx = clientX - startX.current;
      dragXRef.current = dx;
      setDragX(dx);
    };
    const onMouseMove = (e: MouseEvent) => move(e.clientX);
    const onTouchMove = (e: TouchEvent) => move(e.touches[0].clientX);
    const end = () => {
      setDragging(false);
      const dx = dragXRef.current;
      dragXRef.current = 0;
      if (dx > SWIPE_THRESHOLD) onDecideRef.current('right');
      else if (dx < -SWIPE_THRESHOLD) onDecideRef.current('left');
      else setDragX(0);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', end);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', end);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', end);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', end);
    };
  }, [dragging]);

  const begin = (clientX: number) => {
    if (exiting) return;
    startX.current = clientX;
    dragXRef.current = 0;
    setDragging(true);
  };

  const likeOpacity = dragX > 30 ? Math.min(1, (dragX - 30) / 80) : 0;
  const nopeOpacity = dragX < -30 ? Math.min(1, (-dragX - 30) / 80) : 0;

  const matchedCount = rec.ingredients.filter((i) => ownedNames.includes(i.name.toLowerCase())).length;

  const animClass = exiting === 'right' ? 'swipe-right-anim' : exiting === 'left' ? 'swipe-left-anim' : '';

  return (
    <div
      className={`swipe-card ${dragging ? 'dragging' : ''} ${animClass} w-full bg-(--primary-light) rounded-3xl border border-(--primary-dark) shadow-xl overflow-hidden relative cursor-grab active:cursor-grabbing`}
      style={dragX !== 0 ? { transform: `tran(--primary-dark)X(${dragX}px) rotate(${dragX * 0.05}deg)` } : undefined}
      onMouseDown={(e) => begin(e.clientX)}
      onTouchStart={(e) => begin(e.touches[0].clientX)}
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

      <div className="relative h-52 bg-(--primary-dark)">
        <FallbackImg
          src={rec.image}
          alt={rec.name}
          fallbackSrc={placeholderImage(rec.name, 600, 400)}
          className="w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-(--primary-dark)/75 via-transparent to-transparent"></div>
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-(--primary-light)">
          <div>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-(--primary)">{rec.category}</span>
            <h3 className="text-xl font-extrabold mt-1 leading-tight">{rec.name}</h3>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <p className="text-xs sm:text-sm text-(--secondary-dark) line-clamp-2">{rec.description}</p>

        <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-(--primary-dark)-50 border border-(--primary-dark)-100 text-center">
          <div>
            <span className="text-[10px] text-(--primary-dark)-400 block">Biaya Masak</span>
            <span className="text-sm font-extrabold text-(--primary-dark)">{formatRupiah(rec.cookCost)}</span>
          </div>
          <div className="border-x border-(--primary-dark)-200">
            <span className="text-[10px] text-(--primary-dark)-400 block">Waktu</span>
            <span className="text-sm font-bold text-(--primary-dark)-700">{rec.cookingTime} mnt</span>
          </div>
          <div>
            <span className="text-[10px] text-(--primary) block font-semibold">Hemat</span>
            <span className="text-sm font-extrabold text-(--primary)">{formatRupiah(rec.savings)}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-(--primary-dark)-500 uppercase tracking-wider">Bahan Utama:</span>
          <div className="flex flex-wrap gap-1.5">
            {rec.ingredients.slice(0, 4).map((ing) => {
              const isOwned = ownedNames.includes(ing.name.toLowerCase());
              return (
                <span
                  key={ing.name}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-medium ${
                    isOwned ? 'bg-(--primary)/20 text-(--primary-dark)' : 'bg-(--primary-dark)-100 text-(--secondary-dark)'
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
