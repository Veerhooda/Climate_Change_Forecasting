import React, { useState, useEffect } from 'react';
import Hero from './components/Hero/Hero';
import ObservationDashboard from './components/Dashboard/ObservationDashboard';

/**
 * App:
 * - Default: Hero opening experience for "Intelligent Climate Change Forecasting"
 * - On "Initiate Observation" click: Launches the full Climate Maps observation dashboard
 */
export function App() {
  const [currentScreen, setCurrentScreen] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#dashboard') {
      return 'dashboard';
    }
    return 'hero';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#dashboard') {
        setCurrentScreen('dashboard');
      } else if (window.location.hash === '#hero') {
        setCurrentScreen('hero');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLaunchDashboard = () => {
    window.location.hash = 'dashboard';
    setCurrentScreen('dashboard');
  };

  const handleBackToHero = () => {
    window.location.hash = 'hero';
    setCurrentScreen('hero');
  };

  if (currentScreen === 'dashboard') {
    return <ObservationDashboard onBackToHero={handleBackToHero} />;
  }

  return (
    <main className="app-container">
      <Hero onInitiateObservation={handleLaunchDashboard} />
    </main>
  );
}

export default App;
