export function Footer() {
  return (
    <footer className="bg-(--var-light) border-t border-(--primary-dark)-200 mt-12 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-(--primary-dark)-500">
        <div className="flex items-center gap-2">
          <span className="font-bold text-(--primary-dark)-800">DapurKos</span>
          <span>• Smart Meal Planning &amp; Student Financial Optimization</span>
        </div>
        <div>Referensi Harga Rata-rata Pasar Yogyakarta (Update: 13 November 2026)</div>
      </div>
    </footer>
  );
}
