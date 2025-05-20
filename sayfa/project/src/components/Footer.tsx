import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 sm:mb-0">
          © {new Date().getFullYear()} RollerCoin Calculator. Not affiliated with RollerCoin.
        </p>
        <div className="flex items-center space-x-4">
          <a 
            href="https://rollercoin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Official RollerCoin
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;