import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, RotateCcw, Radio } from 'lucide-react';

export function TimelineScrubber({
  currentDate = '1 Oct 2026',
  currentTime = '11:15 GMT+5:30',
  isLive = true,
  onResetLive,
  onTimeChange,
}) {
  const [sliderPos, setSliderPos] = useState(55); // 0 to 100% (55% is Live)
  const [isDragging, setIsDragging] = useState(false);
  const [intervalOption, setIntervalOption] = useState('15 min');
  const [isIntervalOpen, setIsIntervalOpen] = useState(false);
  const trackRef = useRef(null);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    updateSlider(e);
  };

  const updateSlider = (e) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const pos = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pos);
    if (onTimeChange) onTimeChange(pos);
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (isDragging) updateSlider(e);
    };
    const handlePointerUp = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove);
      window.addEventListener('touchend', handlePointerUp);
    }
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging]);

  const handleReset = () => {
    setSliderPos(55);
    if (onResetLive) onResetLive();
  };

  return (
    <div className="dashboard-timeline-widget">
      {/* Top Info Bar */}
      <div className="timeline-header-row">
        {/* Left: Date & Time */}
        <div className="timeline-time-info">
          <span className="timeline-date-label">{currentDate}</span>
          <div className="timeline-time-live">
            <span className="timeline-time-bold">{currentTime}</span>
            {isLive && (
              <span className="live-broadcast-indicator" title="Live stream telemetry" style={{ marginLeft: 6 }}>
                <svg width="16" height="11" viewBox="0 0 20 14" fill="none">
                  <path d="M4 2C2.5 3.5 1.5 5.5 1.5 7.5s1 4 2.5 5.5" stroke="#e04b4b" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M6.5 4.5C5.6 5.3 5 6.4 5 7.5s.6 2.2 1.5 3" stroke="#e04b4b" strokeWidth="1.6" strokeLinecap="round" />
                  <circle cx="10" cy="7.5" r="2.2" fill="#e04b4b" />
                  <path d="M13.5 4.5c.9.8 1.5 1.9 1.5 3s-.6 2.2-1.5 3" stroke="#e04b4b" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M16 2c1.5 1.5 2.5 3.5 2.5 5.5s-1 4-2.5 5.5" stroke="#e04b4b" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
            )}
          </div>
        </div>

        {/* Right: Interval dropdown & Reset button */}
        <div className="timeline-actions">
          <div className="interval-dropdown-wrapper">
            <button
              type="button"
              className="interval-select-btn"
              onClick={() => setIsIntervalOpen(!isIntervalOpen)}
            >
              <Calendar size={13} className="interval-calendar-icon" />
              <span>{intervalOption}</span>
              <ChevronDown size={13} className="interval-chevron" />
            </button>
            {isIntervalOpen && (
              <div className="interval-menu">
                {['5 min', '15 min', '1 hour', '1 day'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`interval-option ${intervalOption === opt ? 'active' : ''}`}
                    onClick={() => {
                      setIntervalOption(opt);
                      setIsIntervalOpen(false);
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="timeline-reset-btn"
            onClick={handleReset}
            title="Reset to current time"
            aria-label="Reset to current time"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Scrubber Track & Draggable Window */}
      <div
        className="timeline-track-container"
        ref={trackRef}
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
      >
        <div className="timeline-track-bg" />

        {/* Selection Range Window (blue dotted outline like in reference image) */}
        <div
          className="timeline-selection-window"
          style={{
            left: `${Math.max(0, sliderPos - 12)}%`,
            width: '24%',
          }}
        />

        {/* Draggable Handle */}
        <div
          className="timeline-thumb"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="thumb-chevrons">
            <span className="chevron-left">‹</span>
            <span className="chevron-right">›</span>
          </div>
        </div>
      </div>

      {/* Tick Marks & Labels Row */}
      <div className="timeline-ticks-row">
        <span className="tick-label">12:00</span>
        <span className="tick-label day-mark">30 Sept</span>
        <span className="tick-label">12:00</span>
        <span className="tick-label day-mark">1 Oct</span>
        <span className="tick-label live-indicator" title="Current time">
          <svg width="14" height="10" viewBox="0 0 20 14" fill="none">
            <path d="M4 2C2.5 3.5 1.5 5.5 1.5 7.5s1 4 2.5 5.5" stroke="#e04b4b" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M6.5 4.5C5.6 5.3 5 6.4 5 7.5s.6 2.2 1.5 3" stroke="#e04b4b" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="10" cy="7.5" r="2.2" fill="#e04b4b" />
            <path d="M13.5 4.5c.9.8 1.5 1.9 1.5 3s-.6 2.2-1.5 3" stroke="#e04b4b" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M16 2c1.5 1.5 2.5 3.5 2.5 5.5s-1 4-2.5 5.5" stroke="#e04b4b" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
        <span className="tick-label day-mark">2 Oct</span>
        <span className="tick-label">12:00</span>
        <span className="tick-label forecast-icon" title="24-hour climate forecast">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7193ff" strokeWidth="2">
            <path d="m10 10 3 3m0 0 5-5m-5 5v7m-3-14 7 7M3 21l3-3m0 0 5-5" />
            <circle cx="18" cy="6" r="3" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default TimelineScrubber;
