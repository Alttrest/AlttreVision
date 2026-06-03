export const APP_NAME = 'MobilyAR';
export const APP_TAGLINE = 'Mobilyanı Odanda Gör';

/**
 * Format price with Turkish locale.
 */
export function formatPrice(price, currency = 'TRY') {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Format dimensions object to readable string.
 */
export function formatDimensions(dims) {
  if (!dims) return null;
  return `${dims.width} × ${dims.depth} × ${dims.height} cm`;
}
