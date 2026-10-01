import React, { useState } from 'react';
import Sidebar from './Sidebar';
import WorldMap from './WorldMap';
import TopControls from './TopControls';
import TimelineScrubber from './TimelineScrubber';
import LegendWidget from './LegendWidget';

// Subscreens
import ApiView from './views/ApiView';
import ForecastView from './views/ForecastView';
import MonitorView from './views/MonitorView';
import ApiReferenceView from './views/ApiReferenceView';
import DataCoverageView from './views/DataCoverageView';
import MethodologyView from './views/MethodologyView';

// Modals
import ResourcesModal from './views/ResourcesModal';
import CreateAccountModal from './views/CreateAccountModal';
import SignInModal from './views/SignInModal';
import TrialModal from './views/TrialModal';
import SettingsModal from './views/SettingsModal';
import LayersModal from './views/LayersModal';

import '../../styles/dashboard.css';

export function ObservationDashboard({ onBackToHero }) {
  const [activeScreen, setActiveScreen] = useState('map');
  const [trialDismissed, setTrialDismissed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeLayer, setActiveLayer] = useState('cleanShare');
  const [searchedCountry, setSearchedCountry] = useState(null);

  // Modals state
  const [isTrialOpen, setIsTrialOpen] = useState(false);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLayersOpen, setIsLayersOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  // Time state matching the image
  const [currentDateString, setCurrentDateString] = useState('1 Oct 2026');
  const [currentTimeString, setCurrentTimeString] = useState('11:15 GMT+5:30');
  const [isLive, setIsLive] = useState(true);

  // Zoom handlers
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev * 1.3, 8));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev * 0.77, 0.6));
  };

  const handleTimeChange = (percent) => {
    // When slider scrubs away from 55%, mark as non-live or adjust display
    if (Math.abs(percent - 55) > 3) {
      setIsLive(false);
      const hourOffset = Math.round((percent - 55) * 0.4);
      const baseHour = 11;
      const targetHour = Math.max(0, Math.min(23, baseHour + hourOffset));
      setCurrentTimeString(`${targetHour.toString().padStart(2, '0')}:15 GMT+5:30`);
      if (percent < 35) setCurrentDateString('30 Sept 2026');
      else if (percent > 70) setCurrentDateString('2 Oct 2026');
      else setCurrentDateString('1 Oct 2026');
    } else {
      setIsLive(true);
      setCurrentDateString('1 Oct 2026');
      setCurrentTimeString('11:15 GMT+5:30');
    }
  };

  const handleResetLive = () => {
    setIsLive(true);
    setCurrentDateString('1 Oct 2026');
    setCurrentTimeString('11:15 GMT+5:30');
  };

  return (
    <div className="observation-dashboard-root">
      {/* 1. Left Sidebar */}
      <Sidebar
        activeScreen={activeScreen}
        setActiveScreen={(scr) => {
          if (scr === 'resources') {
            setIsResourcesOpen(true);
          } else {
            setActiveScreen(scr);
          }
        }}
        trialDismissed={trialDismissed}
        setTrialDismissed={setTrialDismissed}
        onOpenTrial={() => setIsTrialOpen(true)}
        onOpenCreateAccount={() => setIsCreateAccountOpen(true)}
        onOpenSignIn={() => setIsSignInOpen(true)}
      />

      {/* 2. Main Area */}
      <main className="dashboard-main-viewport">
        {activeScreen === 'map' ? (
          <div className="map-view-wrapper">
            {/* Top Floating Controls */}
            <TopControls
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onSelectCountry={(cName) => setSearchedCountry(cName)}
              onToggleSettings={() => setIsSettingsOpen(true)}
              onToggleLayers={() => setIsLayersOpen(true)}
              currentTimeString={currentTimeString}
              currentDateString={currentDateString}
              isLive={isLive}
            />

            {/* Interactive World Map */}
            <WorldMap
              zoomLevel={zoomLevel}
              onZoomChange={(k) => setZoomLevel(k)}
              activeLayer={activeLayer}
              searchedCountry={searchedCountry}
              onClearSearchedCountry={() => setSearchedCountry(null)}
            />

            {/* Bottom Scrubber Widget */}
            <TimelineScrubber
              currentDate={currentDateString}
              currentTime={currentTimeString}
              isLive={isLive}
              onResetLive={handleResetLive}
              onTimeChange={handleTimeChange}
            />

            {/* Bottom Right Legend Widget */}
            <LegendWidget
              title={
                activeLayer === 'precip' || activeLayer === 'cleanShare'
                  ? 'Precipitation probability'
                  : activeLayer === 'severe'
                  ? 'Severe storm probability'
                  : 'Relative humidity'
              }
              unit="%"
            />
          </div>
        ) : activeScreen === 'api' ? (
          <ApiView />
        ) : activeScreen === 'forecast' ? (
          <ForecastView />
        ) : activeScreen === 'monitor' ? (
          <MonitorView />
        ) : activeScreen === 'api-ref' ? (
          <ApiReferenceView />
        ) : activeScreen === 'coverage' ? (
          <DataCoverageView />
        ) : activeScreen === 'methodology' ? (
          <MethodologyView />
        ) : null}
      </main>

      {/* Modals & Dialogs */}
      <ResourcesModal
        isOpen={isResourcesOpen}
        onClose={() => setIsResourcesOpen(false)}
      />
      <CreateAccountModal
        isOpen={isCreateAccountOpen}
        onClose={() => setIsCreateAccountOpen(false)}
        onSwitchToSignIn={() => setIsSignInOpen(true)}
      />
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSwitchToCreateAccount={() => setIsCreateAccountOpen(true)}
      />
      <TrialModal
        isOpen={isTrialOpen}
        onClose={() => setIsTrialOpen(false)}
      />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <LayersModal
        isOpen={isLayersOpen}
        onClose={() => setIsLayersOpen(false)}
        activeLayer={activeLayer}
        onSelectLayer={(l) => setActiveLayer(l)}
      />
    </div>
  );
}

export default ObservationDashboard;
