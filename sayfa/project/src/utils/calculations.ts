import { CryptoData, Rewards } from '../types';

/**
 * Calculate mining rewards based on hashrate, network power, and cryptocurrency data
 */
export const calculateRewards = (
  hashrate: number,
  networkPower: number,
  cryptoData: CryptoData
): Rewards => {
  // Calculate hashrate share
  const hashrateShare = hashrate / networkPower;
  
  // Calculate rewards per day based on block reward, blocks per day, and hashrate share
  const blocksPerDay = 144; // Average number of blocks per day (varies by crypto)
  const dailyReward = cryptoData.blockReward * blocksPerDay * hashrateShare * cryptoData.rewardMultiplier;
  
  // Apply difficulty adjustments if provided in cryptoData
  const adjustedDailyReward = dailyReward * (1 / (cryptoData.difficulty / 1000000));
  
  // Calculate weekly and monthly rewards
  const weeklyReward = adjustedDailyReward * 7;
  const monthlyReward = adjustedDailyReward * 30;
  
  return {
    daily: adjustedDailyReward,
    weekly: weeklyReward,
    monthly: monthlyReward
  };
};

/**
 * Calculate the percentage of network hashrate
 */
export const calculateNetworkPercentage = (hashrate: number, networkPower: number): number => {
  return (hashrate / networkPower) * 100;
};

/**
 * Calculate the USD value of crypto rewards
 */
export const calculateUsdValue = (cryptoAmount: number, cryptoPrice: number): number => {
  return cryptoAmount * cryptoPrice;
};