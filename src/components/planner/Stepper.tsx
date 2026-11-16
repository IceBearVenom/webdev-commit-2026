import { STEP_LABELS, TOTAL_STEPS } from '../../data/equipment';

interface StepperProps {
  step: number;
  onCancel: () => void;
}

export function Stepper({ step, onCancel }: StepperProps) {
  return (
    <div className="bg-(--primary-light) rounded-2xl p-4 sm:p-6 border border-(--primary-dark)-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-(--primary)">
          Langkah {step} dari {TOTAL_STEPS}
        </span>
        <button onClick={onCancel} className="text-xs font-medium text-(--primary-dark)-400 hover:text-(--secondary-dark)">
          <i className="fa-solid fa-xmark mr-1"></i>Batal
        </button>
      </div>
      <div className="w-full bg-(--primary-dark)-100 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-(--primary) h-full rounded-full transition-all duration-300"
          style={{ width: `${Math.round((step / TOTAL_STEPS) * 100)}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-[11px] text-(--primary-dark)-400 mt-2 font-medium">
        {STEP_LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
