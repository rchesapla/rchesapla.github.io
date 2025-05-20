import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  helpText?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  helpText
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };

  // Calculate slider percentage for styling
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
        {helpText && (
          <div className="relative group">
            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
            <div className="absolute right-0 bottom-full mb-2 w-60 bg-gray-900 text-white text-xs rounded-md p-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              {helpText}
              <div className="absolute right-0 top-full w-2 h-2 -mt-1 mr-1 bg-gray-900 transform rotate-45"></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-3">
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-24 py-1.5 px-2 rounded-md border text-right transition-colors ${
            isFocused 
              ? 'border-blue-500 ring-1 ring-blue-500' 
              : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 text-gray-800 dark:text-white`}
        />
        <div className="flex-grow">
          <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div 
              className="absolute h-full bg-blue-500 rounded-full" 
              style={{ width: `${percentage}%` }}
            ></div>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={handleSliderChange}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>{min}</span>
            <span>{max}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputField;