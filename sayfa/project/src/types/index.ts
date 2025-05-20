// Cryptocurrency data
export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  priceUSD: number;
  blockReward: number;
  difficulty: number;
  rewardMultiplier: number;
  colorClass: string;
}

// Mining rewards for different time periods
export interface Rewards {
  daily: number;
  weekly: number;
  monthly: number;
}

// Time frame options
export type TimeFrame = 'daily' | 'weekly' | 'monthly';

// Time frame configuration
export interface TimeFrameOption {
  label: string;
  value: TimeFrame;
}