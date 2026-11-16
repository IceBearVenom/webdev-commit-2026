import { useState } from 'react';
import { EQUIPMENT_OPTIONS, INGREDIENT_UNITS, QUICK_ADD_INGREDIENTS } from '../../data/equipment';
import type { BaseStepProps } from './stepProps';

export function Step1Inventory({ planner, update, goToStep, showToast }: BaseStepProps) {
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [unit, setUnit] = useState<string>('gram');

  const toggleEquipment = (id: string) => {
    update({
      equipment: planner.equipment.includes(id)
        ? planner.equipment.filter((e) => e !== id)
        : [...planner.equipment, id],
    });
  };

  const addIngredient = (ingName: string, ingQty: number, ingUnit: string) => {
    const key = ingName.toLowerCase();
    const exists = planner.userIngredients.some((i) => i.name.toLowerCase() === key);
    update({
      userIngredients: exists
        ? planner.userIngredients.map((i) => (i.name.toLowerCase() === key ? { ...i, qty: i.qty + ingQty } : i))
        : [...planner.userIngredients, { name: ingName, qty: ingQty, unit: ingUnit }],
    });
    showToast(`${ingName} (${ingQty} ${ingUnit}) ditambahkan ke inventaris.`, 'success');
  };

  const handleAdd = () => {
    const trimmed = name.trim();
    const parsedQty = parseFloat(qty);
    if (!trimmed || isNaN(parsedQty) || parsedQty <= 0) {
      showToast('Masukkan nama bahan dan kuantitas yang valid.', 'warning');
      return;
    }
    addIngredient(trimmed, parsedQty, unit);
    setName('');
    setQty('');
  };

  const removeIngredient = (index: number) => {
    update({ userIngredients: planner.userIngredients.filter((_, i) => i !== index) });
  };

  const inputClass =
    'px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500';

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Inventaris Dapur Kosmu</h2>
        <p className="text-sm text-slate-500 mt-1">
          Pilih peralatan yang kamu punya dan masukkan sisa bahan makanan agar AI mengoptimalkan belanja.
        </p>
      </div>

      {/* A. Equipment */}
      <div className="space-y-3">
        <span className="block text-sm font-bold text-slate-800">
          A. Peralatan Masak Tersedia <span className="text-rose-500">*</span>
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {EQUIPMENT_OPTIONS.map((eq) => {
            const selected = planner.equipment.includes(eq.id);
            return (
              <button
                key={eq.id}
                type="button"
                onClick={() => toggleEquipment(eq.id)}
                className={`p-3 rounded-2xl border-2 text-left flex items-center gap-2.5 transition ${
                  selected
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    selected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <i className={`fa-solid ${eq.icon} text-xs`}></i>
                </div>
                <span className="text-xs sm:text-sm font-bold">{eq.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* B. Ingredients */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <span className="block text-sm font-bold text-slate-800">
          B. Bahan yang Sudah Ada di Kos <span className="text-xs font-normal text-slate-400">(Opsional)</span>
        </span>

        <div className="flex flex-wrap gap-1.5">
          <span className="text-xs text-slate-400 py-1">Tambah cepat:</span>
          {QUICK_ADD_INGREDIENTS.map((q) => (
            <button
              key={q.name}
              type="button"
              onClick={() => addIngredient(q.name, q.qty, q.unit)}
              className="text-xs px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 transition"
            >
              {q.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama bahan (mis: Tahu)"
            className={`col-span-5 sm:col-span-6 ${inputClass}`}
          />
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            placeholder="Jml"
            min={1}
            className={`col-span-3 sm:col-span-2 !px-3 ${inputClass}`}
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className={`col-span-4 sm:col-span-2 !px-2 bg-white ${inputClass}`}
          >
            {INGREDIENT_UNITS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAdd}
            className="col-span-12 sm:col-span-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-sm transition"
          >
            Tambah
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {planner.userIngredients.length === 0 ? (
            <span className="text-xs text-slate-400 italic">
              Belum ada bahan yang dimasukkan (AI akan menyusun daftar belanja penuh).
            </span>
          ) : (
            planner.userIngredients.map((item, idx) => (
              <span
                key={item.name}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold"
              >
                <span>
                  {item.name} ({item.qty} {item.unit})
                </span>
                <button
                  type="button"
                  onClick={() => removeIngredient(idx)}
                  aria-label={`Hapus ${item.name}`}
                  className="text-emerald-600 hover:text-rose-600"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </span>
            ))
          )}
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          onClick={() => goToStep(2)}
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition flex items-center gap-2"
        >
          <span>Lanjut: Durasi &amp; Frekuensi</span>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}
