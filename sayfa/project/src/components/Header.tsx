import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Coins } from 'lucide-react';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Coins className="h-8 w-8 text-blue-500" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            RollerCoin Calculator
          </h1>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Calculate your potential mining rewards based on your hashrate and network conditions
      </p>
    </header>
  );
};

export default Header;