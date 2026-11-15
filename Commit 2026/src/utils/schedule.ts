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
