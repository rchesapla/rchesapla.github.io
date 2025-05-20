import { CryptoData, TimeFrameOption } from '../types';

// Cryptocurrency list with current data
// Note: In a real application, these values would be fetched from an API
export const cryptoList: CryptoData[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    priceUSD: 57245.32,
    blockReward: 6.25,
    difficulty: 71193262566161,
    rewardMultiplier: 1.0,
    colorClass: 'orange-500'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    priceUSD: 3124.67,
    blockReward: 2.0,
    difficulty: 18543928745871,
    rewardMultiplier: 1.2,
    colorClass: 'blue-500'
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    priceUSD: 0.1234,
    blockReward: 10000,
    difficulty: 8712384723,
    rewardMultiplier: 0.95,
    colorClass: 'yellow-500'
  },
  {
    id: 'litecoin',
    name: 'Litecoin',
    symbol: 'LTC',
    priceUSD: 76.23,
    blockReward: 12.5,
    difficulty: 24856271523,
    rewardMultiplier: 0.9,
    colorClass: 'gray-500'
  },
  {
    id: 'binancecoin',
    name: 'Binance Coin',
    symbol: 'BNB',
    priceUSD: 312.45,
    blockReward: 0.5,
    difficulty: 7236451234,
    rewardMultiplier: 1.05,
    colorClass: 'amber-500'
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    priceUSD: 0.3456,
    blockReward: 1000,
    difficulty: 3245678234,
    rewardMultiplier: 1.1,
    colorClass: 'indigo-500'
  }
];

// Time frame options
export const timeFrames: TimeFrameOption[] = [
  {
    label: 'Daily',
    value: 'daily'
  },
  {
    label: 'Weekly',
    value: 'weekly'
  },
  {
    label: 'Monthly',
    value: 'monthly'
  }
];