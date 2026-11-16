import type { Recipe } from '../types';

export const DAY_LABELS = ['Hari 1', 'Hari 2', 'Hari 3', 'Hari 4', 'Hari 5', 'Hari 6', 'Hari 7'];

export function getSlotLabel(frequencyPerDay: number, slotIndex: number): string {
  if (frequencyPerDay === 1) return 'Menu Utama';
  if (frequencyPerDay === 2) return slotIndex === 0 ? 'Makan Siang' : 'Makan Malam';
  return ['Sarapan', 'Makan Siang', 'Makan Malam'][slotIndex];
}

/** Distribute selected recipes across [day][slot], cycling when there are fewer recipes than slots. */
export function buildSchedule(selected: Recipe[], days: number, frequencyPerDay: number): Recipe[][] {
  const matrix: Recipe[][] = [];
  if (selected.length === 0) return matrix;
  let pointer = 0;
  for (let d = 0; d < days; d++) {
    matrix[d] = [];
    for (let f = 0; f < frequencyPerDay; f++) {
      matrix[d][f] = selected[pointer % selected.length];
      pointer++;
    }
  }
  return matrix;
}

/**
 * Every meal that will actually be cooked, in order. When fewer recipes are picked than there are
 * slots, recipes repeat, so cost and shopping totals must be computed on this list, not on the raw picks.
 */
export function getScheduledMeals(selected: Recipe[], days: number, frequencyPerDay: number): Recipe[] {
  return buildSchedule(selected, days, frequencyPerDay).flat();
}
