import type { PlannerState, ToastType } from '../../types';

export interface BaseStepProps {
  planner: PlannerState;
  update: (patch: Partial<PlannerState>) => void;
  goToStep: (step: number) => void;
  showToast: (message: string, type?: ToastType) => void;
}
