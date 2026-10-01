import React, { useState } from 'react';
import { X, CheckCircle2, Key, Copy, Check } from 'lucide-react';

export function TrialModal({ isOpen, onClose }) {
  const [activated, setActivated] = useState(false);
  const [email, setEmail] = useState('');
  const [trialKey, setTrialKey] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleActivate = (e) => {
    e.preventDefault();
    const generatedKey = `clm_trial_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
    setTrialKey(generatedKey);
    setActivated(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(trialKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">14-Day Free API Trial</h3>
            <p className="modal-subtitle">Instant access to all planetary signals, real-time grid feeds, and forecasted emissions.</p>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close trial modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {activated ? (
            <div className="trial-active-box">
              <CheckCircle2 size={32} className="green-val mb-2" />
              <h4>Your Trial API Key is Ready</h4>
              <p>Active until 15 Oct 2026. 100,000 requests included.</p>

              <div className="trial-key-display">
                <code>{trialKey}</code>
                <button type="button" className="copy-btn" onClick={handleCopy}>
                  {copied ? <Check size={14} className="green-val" /> : <Copy size={14} />}
                </button>
              </div>

              <button type="button" className="auth-submit-btn mt-4" onClick={onClose}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleActivate} className="auth-form">
              <div className="trial-perks-list">
                <div className="perk-item"><CheckCircle2 size={15} className="green-val" /> 194 countries with 15-minute resolution</div>
                <div className="perk-item"><CheckCircle2 size={15} className="green-val" /> Real-time generation mix breakdown (solar, wind, hydro, fossil)</div>
                <div className="perk-item"><CheckCircle2 size={15} className="green-val" /> 24-hour ahead predictive carbon forecast</div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="developer@climate.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button type="submit" className="auth-submit-btn">
                Generate Instant Trial Key
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrialModal;
