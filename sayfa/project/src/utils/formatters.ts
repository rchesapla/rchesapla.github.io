/**
 * Format a crypto value to a readable string with appropriate precision
 */
export const formatCrypto = (value: number): string => {
  if (value === 0) return '0';
  
  if (value < 0.000001) {
    return value.toExponential(6);
  }
  
  if (value < 0.001) {
    return value.toFixed(8);
  }
  
  if (value < 1) {
    return value.toFixed(6);
  }
  
  if (value < 1000) {
    return value.toFixed(4);
  }
  
  return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
};

/**
 * Format a USD value to a readable string
 */
export const formatUSD = (value: number): string => {
  if (value === 0) return '$0.00';
  
  if (value < 0.01) {
    return '$' + value.toFixed(6);
  }
  
  if (value < 1) {
    return '$' + value.toFixed(4);
  }
  
  if (value >= 1000000) {
    return '$' + (value / 1000000).toFixed(2) + 'M';
  }
  
  if (value >= 1000) {
    return '$' + (value / 1000).toFixed(2) + 'K';
  }
  
  return '$' + value.toFixed(2);
};

/**
 * Format large numbers to a readable format
 */
export const formatLargeNumber = (value: number): string => {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(2) + 'B';
  }
  
  if (value >= 1000000) {
    return (value / 1000000).toFixed(2) + 'M';
  }
  
  if (value >= 1000) {
    return (value / 1000).toFixed(2) + 'K';
  }
  
  return value.toString();
};