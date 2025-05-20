import React from 'react';
import { CryptoData } from '../types';

interface CryptoSelectorProps {
  cryptoList: CryptoData[];
  selectedCrypto: CryptoData;
  onSelect: (crypto: CryptoData) => void;
}

const CryptoSelector: React.FC<CryptoSelectorProps> = ({ 
  cryptoList, 
  selectedCrypto, 
  onSelect 
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {cryptoList.map((crypto) => (
        <button
          key={crypto.id}
          onClick={() => onSelect(crypto)}
          className={`p-3 rounded-lg border transition-all duration-200 flex flex-col items-center ${
            selectedCrypto.id === crypto.id
              ? `border-2 border-${crypto.colorClass} bg-${crypto.colorClass}/10 shadow-sm`
              : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
          }`}
        >
          <div 
            className={`w-8 h-8 flex items-center justify-center rounded-full bg-${crypto.colorClass}/20 mb-1`}
          >
            <span className={`text-${crypto.colorClass} text-lg font-bold`}>
              {crypto.symbol.charAt(0)}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {crypto.name}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {crypto.symbol}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CryptoSelector;