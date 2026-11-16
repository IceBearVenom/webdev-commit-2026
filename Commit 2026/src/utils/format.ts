export function formatRupiah(num: number): string {
  return 'Rp ' + Math.round(num).toLocaleString('id-ID');
}

export function placeholderImage(text: string, width: number, height: number): string {
  return `https://placehold.co/${width}x${height}/059669/ffffff?text=${encodeURIComponent(text)}`;
}
