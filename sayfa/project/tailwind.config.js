/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionProperty: {
        'height': 'height',
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-orange-500',
    'bg-orange-500/20',
    'bg-orange-500/10',
    'bg-orange-500/5',
    'bg-orange-500/30',
    'text-orange-500',
    'from-orange-500/20',
    'to-orange-500/5',
    'from-orange-500/30',
    
    'bg-blue-500',
    'bg-blue-500/20',
    'bg-blue-500/10',
    'bg-blue-500/5',
    'bg-blue-500/30',
    'text-blue-500',
    'from-blue-500/20',
    'to-blue-500/5',
    'from-blue-500/30',
    
    'bg-yellow-500',
    'bg-yellow-500/20',
    'bg-yellow-500/10',
    'bg-yellow-500/5',
    'bg-yellow-500/30',
    'text-yellow-500',
    'from-yellow-500/20',
    'to-yellow-500/5',
    'from-yellow-500/30',
    
    'bg-gray-500',
    'bg-gray-500/20',
    'bg-gray-500/10',
    'bg-gray-500/5',
    'bg-gray-500/30',
    'text-gray-500',
    'from-gray-500/20',
    'to-gray-500/5',
    'from-gray-500/30',
    
    'bg-amber-500',
    'bg-amber-500/20',
    'bg-amber-500/10',
    'bg-amber-500/5',
    'bg-amber-500/30',
    'text-amber-500',
    'from-amber-500/20',
    'to-amber-500/5',
    'from-amber-500/30',
    
    'bg-indigo-500',
    'bg-indigo-500/20',
    'bg-indigo-500/10',
    'bg-indigo-500/5',
    'bg-indigo-500/30',
    'text-indigo-500',
    'from-indigo-500/20',
    'to-indigo-500/5',
    'from-indigo-500/30',
    
    'border-orange-500',
    'border-blue-500',
    'border-yellow-500',
    'border-gray-500',
    'border-amber-500',
    'border-indigo-500'
  ]
};