import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

export function CreateAccountModal({ isOpen, onClose, onSwitchToSignIn }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', organization: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 1800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Create your Weather Maps account</h3>
            <p className="modal-subtitle">Access global radar telemetry, 14-day weather forecasts, and extreme squall alerts.</p>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {submitted ? (
            <div className="auth-success-banner">
              <Check size={28} className="green-val" />
              <h4>Account Created Successfully!</h4>
              <p>Welcome to Climate Maps. Launching developer environment...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Dr. Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="jane@climate.org"
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

              <div className="form-group">
                <label>Organization / Research Institute</label>
                <input
                  type="text"
                  placeholder="Planetary Research Lab"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                />
              </div>

              <button type="submit" className="auth-submit-btn">
                Create free account
              </button>

              <div className="auth-switch-footer">
                <span>Already have an account? </span>
                <button
                  type="button"
                  className="auth-switch-link"
                  onClick={() => {
                    onClose();
                    onSwitchToSignIn();
                  }}
                >
                  Sign in
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateAccountModal;
