import React, { useState } from 'react';
import { EQUIPMENT_LIST } from '../../data/equipment';
import { UserIngredientInput } from '../../types';
import { Plus, Trash2, CheckCircle2, Wrench, Sparkles, ShoppingBag } from 'lucide-react';

interface Step1Props {
  selectedEquipment: string[];
  setSelectedEquipment: (equip: string[]) => void;
  ingredients: UserIngredientInput[];
  setIngredients: (ing: UserIngredientInput[]) => void;
  onNext: () => void;
}

export const Step1KitchenInventory: React.FC<Step1Props> = ({
  selectedEquipment,
  setSelectedEquipment,
  ingredients,
  setIngredients,
  onNext
}) => {
  const [ingName, setIngName] = useState('');
  const [ingQty, setIngQty] = useState<number>(1);
  const [ingUnit, setIngUnit] = useState('butir');

  const toggleEquipment = (name: string) => {
    if (selectedEquipment.includes(name)) {
      setSelectedEquipment(selectedEquipment.filter((e) => e !== name));
    } else {
      setSelectedEquipment([...selectedEquipment, name]);
    }
  };

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingName.trim()) return;

    setIngredients([
      ...ingredients,
      { name: ingName.trim(), quantity: ingQty, unit: ingUnit }
    ]);

    setIngName('');
    setIngQty(1);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Quick Preset Additions
  const addQuickIngredient = (name: string, quantity: number, unit: string) => {
    if (ingredients.some((i) => i.name.toLowerCase() === name.toLowerCase())) return;
    setIngredients([...ingredients, { name, quantity, unit }]);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Step Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <span className="text-xs font-bold tracking-widest text-emerald-200 uppercase">
          Langkah 1 dari 7 • Kitchen Inventory
        </span>
        <h2 className="text-2xl sm:text-3xl font-black mt-1">
          Inventaris Peralatan & Bahan Dapur
        </h2>
        <p className="text-sm text-emerald-100 mt-2 max-w-2xl leading-relaxed">
          Pilih peralatan memasak yang ada di kos Anda dan masukkan bahan makanan yang sudah tersedia agar AI dapat memaksimalkan rekomendasi menu yang sesuai & hemat.
        </p>
      </div>

      {/* Section A: Cooking Equipment */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-emerald-600" />
              A. Peralatan Memasak yang Dimiliki
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Klik peralatan yang tersedia di dapur kos Anda (Bisa pilih lebih dari satu).
            </p>
          </div>
          <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {selectedEquipment.length} Terpilih
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
          {EQUIPMENT_LIST.map((item) => {
            const isSelected = selectedEquipment.includes(item.name);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleEquipment(item.name)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between h-24 ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-2xl">{item.icon}</span>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                  )}
                </div>
                <div>
                  <span
                    className={`text-xs font-bold block line-clamp-1 ${
                      isSelected ? 'text-emerald-900' : 'text-slate-800'
                    }`}
                  >
                    {item.name}
                  </span>
                  <span className="text-[10px] text-slate-400 line-clamp-1 font-medium">
                    {item.description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section B: Available Ingredients */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-600" />
            B. Bahan Makanan yang Sudah Ada di Kos (Opsional)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Sistem akan mengutamakan resep yang memakai sisa bahan ini agar hemat & zero food waste.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAddIngredient} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-5">
            <input
              type="text"
              placeholder="Nama bahan (misal: Telur, Tempe, Beras)"
              value={ingName}
              onChange={(e) => setIngName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            />
          </div>
          <div className="sm:col-span-3">
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={ingQty}
              onChange={(e) => setIngQty(parseFloat(e.target.value) || 1)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <select
              value={ingUnit}
              onChange={(e) => setIngUnit(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-semibold text-slate-700 bg-white"
            >
              <option value="butir">butir</option>
              <option value="papan">papan</option>
              <option value="potong">potong</option>
              <option value="kg">kg</option>
              <option value="gram">gram</option>
              <option value="ikat">ikat</option>
              <option value="bungkus">bungkus</option>
              <option value="sdm">sdm</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-1 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Tambah
            </button>
          </div>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="pt-2">
          <span className="text-xs font-semibold text-slate-400 block mb-2">
            Tambah Cepat Bahan Favorit Anak Kos:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Beras', qty: 1, unit: 'kg' },
              { name: 'Telur', qty: 5, unit: 'butir' },
              { name: 'Tempe', qty: 1, unit: 'papan' },
              { name: 'Tahu', qty: 1, unit: 'bungkus' },
              { name: 'Kangkung', qty: 1, unit: 'ikat' },
              { name: 'Kecap Manis', qty: 1, unit: 'bungkus' },
              { name: 'Minyak Goreng', qty: 1, unit: 'liter' },
              { name: 'Bawang Merah', qty: 1, unit: 'bungkus' }
            ].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => addQuickIngredient(preset.name, preset.qty, preset.unit)}
                className="px-3 py-1 rounded-full bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 text-xs font-medium transition-colors border border-slate-200"
              >
                + {preset.name} ({preset.qty} {preset.unit})
              </button>
            ))}
          </div>
        </div>

        {/* Active Ingredients List */}
        {ingredients.length > 0 ? (
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {ingredients.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{item.name}</span>
                  <span className="text-slate-400 font-normal">
                    ({item.quantity} {item.unit})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(idx)}
                  className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl text-xs text-slate-400 font-medium">
            Belum ada bahan yang dimasukkan (Sistem akan membuat rekomendasi standar bahan hemat).
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
        >
          <span>Lanjut ke Step 2 (Durasi Perencanaan)</span>
          <Sparkles className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
