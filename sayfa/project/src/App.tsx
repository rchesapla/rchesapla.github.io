import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Calculator from './components/Calculator';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Header />
          <main className="my-8">
            <Calculator />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;