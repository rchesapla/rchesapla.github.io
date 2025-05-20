import React from 'react';
import { Rewards, TimeFrame, CryptoData } from '../types';
import { formatCrypto, formatUSD } from '../utils/formatters';
import { TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

interface ResultsProps {
  rewards: Rewards;
  activeTimeFrame: TimeFrame;
  cryptoData: CryptoData;
  isCalculating: boolean;
}

const Results: React.FC<ResultsProps> = ({
  rewards,
  activeTimeFrame,
  cryptoData,
  isCalculating
}) => {
  // Get the current reward amount based on timeframe
  const currentReward = rewards[activeTimeFrame];
  
  // Calculate USD value
  const usdValue = currentReward * cryptoData.priceUSD;
  
  // Determine which title to display
  const timeFrameTitle = 
    activeTimeFrame === 'daily' ? 'Daily' : 
    activeTimeFrame === 'weekly' ? 'Weekly' : 'Monthly';

  return (
    <div className="flex-grow flex flex-col">
      <div className={`p-6 rounded-xl bg-gradient-to-br from-${cryptoData.colorClass}/20 to-${cryptoData.colorClass}/5 dark:from-${cryptoData.colorClass}/30 dark:to-gray-800/50 flex-grow flex flex-col`}>
        {isCalculating ? (
          <div className="flex-grow flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-6 w-24 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
              <div className="h-12 w-40 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center">
              <TrendingUp className={`h-5 w-5 mr-2 text-${cryptoData.colorClass}`} />
              <h3 className={`text-lg font-medium text-${cryptoData.colorClass}`}>
                {timeFrameTitle} Estimated Rewards
              </h3>
            </div>
            
            <div className="flex-grow flex flex-col justify-center items-center text-center">
              <div className="mb-2 flex items-baseline">
                <span className="text-4xl font-bold text-gray-800 dark:text-white">
                  {formatCrypto(currentReward)}
                </span>
                <span className="ml-2 text-lg text-gray-600 dark:text-gray-300">
                  {cryptoData.symbol}
                </span>
              </div>
              
              <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>{formatUSD(usdValue)}</span>
              </p>
              
              <div className="mt-8 w-full">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <span>Current {cryptoData.name} Price:</span>
                  <span className="font-medium">{formatUSD(cryptoData.priceUSD)}</span>
                </div>
                
                <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-4"></div>
                
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {Object.entries(rewards).map(([timeframe, amount]) => (
                    <div key={timeframe} className="text-center">
                      <p className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1">
                        {timeframe}
                      </p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {formatCrypto(amount)} {cryptoData.symbol}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatUSD(amount * cryptoData.priceUSD)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-white/60 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-2">
                <BarChart3 className="h-4 w-4 mr-2 text-gray-500" />
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Network Statistics</h4>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Difficulty</p>
                  <p className="font-medium text-gray-800 dark:text-white">{cryptoData.difficulty.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Block Reward</p>
                  <p className="font-medium text-gray-800 dark:text-white">{cryptoData.blockReward} {cryptoData.symbol}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Results;