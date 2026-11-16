import { useEffect, useState } from 'react';
import type { Toast, ToastType } from '../../types';

const COLORS: Record<ToastType, string> = {
  success: 'bg-(--primary) text-white border-(--primary)',
  warning: 'bg-amber-500 text-(--primary-dark)-950 border-amber-400',
  error: 'bg-rose-600 text-white border-rose-500',
  info: 'bg-(--primary-dark)-800 text-white border-(--primary-dark)-700',
};

const ICONS: Record<ToastType, string> = {
  success: 'fa-circle-check',
  warning: 'fa-triangle-exclamation',
  error: 'fa-circle-xmark',
  info: 'fa-circle-info',
};

interface ToastItemProps {
  toast: Toast;
  onDone: (id: number) => void;
}

function ToastItem({ toast, onDone }: ToastItemProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    const hideTimer = window.setTimeout(() => setVisible(false), 3200);
    const removeTimer = window.setTimeout(() => onDone(toast.id), 3500);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(hideTimer);
      window.clearTimeout(removeTimer);
    };
  }, [toast.id, onDone]);

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg border text-xs sm:text-sm font-medium transition-all duration-300 transform ${
        visible ? 'tran(--primary-dark)-y-0 opacity-100' : 'tran(--primary-dark)-y-2 opacity-0'
      } ${COLORS[toast.type]}`}
    >
      <i className={`fa-solid ${ICONS[toast.type]} text-base`}></i>
      <span className="flex-1">{toast.message}</span>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDone={onDismiss} />
      ))}
    </div>
  );
}
