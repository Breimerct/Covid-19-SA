export const formatNumber = (value: number, decimals = 0) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return '';

  const [int, dec] = Math.abs(n).toFixed(decimals).split('.');
  const withDots = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return (n < 0 ? '-' : '') + withDots + (dec ? ',' + dec : '');
};
