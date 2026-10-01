import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

export function SignInModal({ isOpen, onClose, onSwitchToCreateAccount }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 1500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Sign in to Weather Maps</h3>
            <p className="modal-subtitle">Continue to your radar telemetry dashboard and saved weather stations.</p>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {submitted ? (
            <div className="auth-success-banner">
              <Check size={28} className="green-val" />
              <h4>Authenticated</h4>
              <p>Loading session token...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <button type="submit" className="auth-submit-btn">
                Sign in
              </button>

              <div className="auth-switch-footer">
                <span>Don't have an account? </span>
                <button
                  type="button"
                  className="auth-switch-link"
                  onClick={() => {
                    onClose();
                    onSwitchToCreateAccount();
                  }}
                >
                  Create account
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignInModal;
