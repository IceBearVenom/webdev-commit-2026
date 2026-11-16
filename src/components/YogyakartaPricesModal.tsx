import React, { useState } from 'react';
import { YOGYAKARTA_MARKET_PRICES } from '../data/marketPrices';
import { Store, X, Search, Calendar, Info, MapPin } from 'lucide-react';

interface YogyakartaPricesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const YogyakartaPricesModal: React.FC<YogyakartaPricesModalProps> = ({
  isOpen,
  onClose
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  if (!isOpen) return null;

  const categories = ['Semua', ...Array.from(new Set(YOGYAKARTA_MARKET_PRICES.map((p) => p.category)))];

  const filtered = YOGYAKARTA_MARKET_PRICES.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-800 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs text-emerald-200 font-bold uppercase tracking-wider mb-1">
            <MapPin className="w-4 h-4" /> Pasar Tradisional & Supermarket Yogyakarta
          </div>
          <h3 className="text-2xl font-black">Database Harga Bahan Makanan</h3>
          <p className="text-xs text-emerald-100 mt-1 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" /> Terakhir Diperbarui: 13 November 2026 (Area Pogung, Seturan, Gejayan)
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari bahan makanan (misal: Telur, Tempe, Beras, Kangkung)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Prices List */}
        <div className="p-6 overflow-y-auto space-y-2 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">
                    {item.category}
                  </span>
                  <h5 className="text-sm font-bold text-slate-900">{item.name}</h5>
                  <span className="text-[11px] text-slate-500">
                    Per {item.unit}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-emerald-600 block">
                    Rp{item.averagePriceYogya.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {item.lastUpdated}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Info className="w-4 h-4 text-emerald-600" />
            Harga acuan resmi sistem untuk perhitungan budget DapurKos.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white font-bold rounded-xl"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
