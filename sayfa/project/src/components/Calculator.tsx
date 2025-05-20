import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, HelpCircle } from 'lucide-react';
import CryptoSelector from './CryptoSelector';
import InputField from './InputField';
import Results from './Results';
import { calculateRewards } from '../utils/calculations';
import { CryptoData, Rewards, TimeFrame } from '../types';
import { cryptoList, timeFrames } from '../constants';

const Calculator: React.FC = () => {
  const [hashrate, setHashrate] = useState<number>(100);
  const [networkPower, setNetworkPower] = useState<number>(1000000);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData>(cryptoList[0]);
  const [rewards, setRewards] = useState<Rewards>({
    daily: 0,
    weekly: 0,
    monthly: 0
  });
  const [activeTimeFrame, setActiveTimeFrame] = useState<TimeFrame>('daily');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Calculate rewards whenever inputs change
  useEffect(() => {
    setIsCalculating(true);
    // Add a slight delay to show calculation animation
    const timer = setTimeout(() => {
      const calculatedRewards = calculateRewards(hashrate, networkPower, selectedCrypto);
      setRewards(calculatedRewards);
      setIsCalculating(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [hashrate, networkPower, selectedCrypto]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-200">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <CalcIcon className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Mining Calculator</h2>
      </div>
      
      <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Choose Cryptocurrency</h3>
              <div className="relative group">
                <HelpCircle className="h-5 w-5 text-gray-400 cursor-help" />
                <div className="absolute right-0 bottom-full mb-2 w-64 bg-gray-900 text-white text-sm rounded-md p-3 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  Select the cryptocurrency you want to mine. Each has different rewards and difficulty.
                  <div className="absolute right-0 top-full w-3 h-3 -mt-1.5 mr-2.5 bg-gray-900 transform rotate-45"></div>
                </div>
              </div>
            </div>
            <CryptoSelector 
              cryptoList={cryptoList} 
              selectedCrypto={selectedCrypto} 
              onSelect={setSelectedCrypto} 
            />
          </div>

          <InputField 
            label="Your Hashrate (TH/s)" 
            value={hashrate} 
            onChange={setHashrate} 
            min={0.1} 
            max={10000} 
            step={0.1}
            helpText="Your total mining power in terahashes per second"
          />
          
          <InputField 
            label="Network Power (TH/s)" 
            value={networkPower} 
            onChange={setNetworkPower} 
            min={1000} 
            max={10000000} 
            step={1000}
            helpText="Total network hashrate for this cryptocurrency"
          />
        </div>
        
        <div className="lg:col-span-3">
          <div className="h-full flex flex-col">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-3">Estimated Rewards</h3>
              <div className="flex space-x-2 mb-4">
                {timeFrames.map(frame => (
                  <button
                    key={frame.value}
                    onClick={() => setActiveTimeFrame(frame.value)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTimeFrame === frame.value
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {frame.label}
                  </button>
                ))}
              </div>
            </div>
            
            <Results 
              rewards={rewards} 
              activeTimeFrame={activeTimeFrame}
              cryptoData={selectedCrypto}
              isCalculating={isCalculating}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;