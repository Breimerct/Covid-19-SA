export const formatNumber = (value: number, decimals = 0) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return '';

  const [int, dec] = Math.abs(n).toFixed(decimals).split('.');
  const withDots = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return (n < 0 ? '-' : '') + withDots + (dec ? ',' + dec : '');
};

export const formatLongDateWithTime = (timestamp?: number | string): string => {
  if (!timestamp) return '---';

  try {
    const date = new Date(timestamp);

    if (isNaN(date.getTime())) return '---';

    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  } catch {
    return '---';
  }
};
