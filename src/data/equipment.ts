import type { EquipmentOption } from '../types';

export const EQUIPMENT_OPTIONS: EquipmentOption[] = [
  { id: 'Rice cooker', label: 'Rice Cooker', icon: 'fa-bowl-rice' },
  { id: 'Kompor', label: 'Kompor', icon: 'fa-fire-burner' },
  { id: 'Wajan', label: 'Wajan', icon: 'fa-utensils' },
  { id: 'Panci', label: 'Panci', icon: 'fa-kitchen-set' },
  { id: 'Pisau', label: 'Pisau', icon: 'fa-hocho' },
  { id: 'Talenan', label: 'Talenan', icon: 'fa-table-cells-large' },
  { id: 'Microwave', label: 'Microwave', icon: 'fa-microchip' },
];

export const INGREDIENT_UNITS = ['gram', 'butir', 'papan', 'bungkus', 'ikat', 'siung', 'sdm', 'ml', 'buah', 'sachet', 'keping'] as const;

export const QUICK_ADD_INGREDIENTS = [
  { name: 'Beras', qty: 500, unit: 'gram', label: '+ Beras (500g)' },
  { name: 'Telur Ayam', qty: 4, unit: 'butir', label: '+ Telur (4 butir)' },
  { name: 'Tempe', qty: 1, unit: 'papan', label: '+ Tempe (1 papan)' },
  { name: 'Kecap Manis', qty: 5, unit: 'sdm', label: '+ Kecap Manis' },
  { name: 'Minyak Goreng', qty: 250, unit: 'ml', label: '+ Minyak Goreng' },
] as const;

export const STEP_LABELS = [
  '1. Dapur',
  '2. Durasi',
  '3. Budget',
  '4. Pilih AI',
  '5. Evaluasi',
  '6. Ringkasan',
  '7. Jadwal',
] as const;

export const TOTAL_STEPS = 7;
