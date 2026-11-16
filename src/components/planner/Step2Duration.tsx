import type { BaseStepProps } from './stepProps';

const FREQUENCY_OPTIONS = [
  { value: 1, label: '1x', hint: 'Sekali sehari' },
  { value: 2, label: '2x', hint: 'Siang & Malam' },
  { value: 3, label: '3x', hint: 'Pagi, Siang, Malam' },
];

export function Step2Duration({ planner, update, goToStep }: BaseStepProps) {
  const totalMeals = planner.durationDays * planner.frequencyPerDay;

  return (
    <div className="bg-(--primary-light) rounded-3xl p-6 sm:p-8 border border-(--primary-dark) shadow-sm space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-(--primary-dark)">Durasi &amp; Frekuensi Memasak</h2>
        <p className="text-sm text-(--primary-dark)-500 mt-1">
          Tentukan berapa hari kamu ingin merencanakan menu dan berapa kali masak setiap harinya.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="duration-slider" className="text-sm font-bold text-(--primary-dark)-800">
              Durasi Perencanaan (1 - 7 Hari)
            </label>
            <span className="px-3 py-1 rounded-full bg-(--primary)/20 text-(--primary-dark) font-bold text-sm">
              {planner.durationDays} Hari
            </span>
          </div>
          <input
            id="duration-slider"
            type="range"
            min={1}
            max={7}
            value={planner.durationDays}
            onChange={(e) => update({ durationDays: parseInt(e.target.value, 10) })}
            className="w-full accent-(--primary) cursor-pointer h-2 bg-(--primary-dark)-200 rounded-lg"
          />
          <div className="flex justify-between text-xs text-(--primary-dark)-400 mt-1">
            <span>1 Hari</span>
            <span>3 Hari</span>
            <span>5 Hari</span>
            <span>7 Hari (1 Minggu)</span>
          </div>
        </div>

        <div className="pt-3">
          <span className="block text-sm font-bold text-(--primary-dark)-800 mb-2">Frekuensi Memasak per Hari</span>
          <div className="grid grid-cols-3 gap-3">
            {FREQUENCY_OPTIONS.map((opt) => {
              const active = planner.frequencyPerDay === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => update({ frequencyPerDay: opt.value })}
                  className={`p-4 rounded-2xl border-2 text-center transition ${
                    active
                      ? 'border-(--primary) bg-(--primary)/10'
                      : 'border-(--primary-dark)-200 hover:border-(--primary)/60'
                  }`}
                >
                  <div className={`text-lg font-extrabold ${active ? 'text-(--primary)' : 'text-(--primary-dark)-800'}`}>
                    {opt.label}
                  </div>
                  <div className={`text-xs ${active ? 'text-(--primary) font-medium' : 'text-(--primary-dark)-500'}`}>
                    {opt.hint}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-(--primary-dark)-50 border border-(--primary-dark)-200/80 flex items-center justify-between">
          <span className="text-sm text-(--secondary-dark)">Target Total Sesi Masak:</span>
          <span className="font-extrabold text-(--primary) text-base">{totalMeals} Resep</span>
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <button
          onClick={() => goToStep(1)}
          className="px-5 py-3 rounded-2xl bg-(--primary-dark)-100 hover:bg-(--primary-dark)-200 text-(--primary-dark)-700 font-semibold text-sm transition"
        >
          <i className="fa-solid fa-arrow-left mr-1.5"></i>Kembali
        </button>
        <button
          onClick={() => goToStep(3)}
          className="px-6 py-3 rounded-2xl bg-(--primary) hover:bg-(--primary)/85 text-white font-bold text-sm transition flex items-center gap-2"
        >
          <span>Lanjut: Atur Budget</span>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}
