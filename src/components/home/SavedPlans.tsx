import type { SavedMealPlan } from '../../types';
import { formatRupiah } from '../../utils/format';

interface SavedPlansProps {
  plans: SavedMealPlan[];
  onOpen: (index: number) => void;
  onDelete: (index: number) => void;
  onNew: () => void;
}

export function SavedPlans({ plans, onOpen, onDelete, onNew }: SavedPlansProps) {
  if (plans.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-(--primary-dark) flex items-center gap-2">
            <i className="fa-solid fa-calendar-check text-(--primary)"></i>
            <span>Meal Plan Saya</span>
          </h2>
          <p className="text-xs sm:text-sm text-(--primary-dark)-500">
            Tersimpan secara lokal di sesi browser perangkatmu tanpa perlu akun.
          </p>
        </div>
        <button onClick={onNew} className="text-xs sm:text-sm font-semibold text-(--primary) hover:text-(--primary)">
          + Buat Rencana Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((plan, idx) => (
          <div
            key={plan.id}
            onClick={() => onOpen(idx)}
            className="bg-(--primary-light) rounded-2xl p-5 border border-(--primary)/30 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between gap-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-(--primary)/20 text-(--primary-dark) text-[11px] font-bold mb-1">
                  {plan.durationDays} Hari • {plan.frequencyPerDay}x Masak/Hari
                </span>
                <h3 className="font-bold text-(--primary-dark) text-base">{plan.title}</h3>
                <p className="text-xs text-(--primary-dark) mt-0.5">Dibuat: {plan.createdAt}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(idx);
                }}
                title="Hapus Meal Plan"
                className="text-(--primary-dark) hover:text-rose-500 p-1.5 transition"
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-(--primary-dark) text-xs">
              <div>
                <span className="text-(--primary-dark) block">Estimasi Pengeluaran</span>
                <span className="font-bold text-(--primary-dark)">{formatRupiah(plan.totalUsedCost)}</span>
              </div>
              <div className="text-right">
                <span className="text-(--primary-dark) block">Potensi Penghematan</span>
                <span className="font-extrabold text-(--primary)">{formatRupiah(plan.totalSavings)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
