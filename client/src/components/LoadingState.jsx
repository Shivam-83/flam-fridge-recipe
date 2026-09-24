import React from 'react';

/**
 * LoadingState Component
 * Matches Stitch Desktop Loading State with dual spinning SVG rings,
 * pulsing glowing backdrop, and live AI thinking step progression.
 */
export default function LoadingState() {
  return (
    <div className="fai-loading-card" role="status" aria-live="polite">
      {/* Top Processing Bar */}
      <div className="fai-loading-top-bar">
        <div className="fai-loading-top-fill" />
      </div>

      {/* Ambient Glow */}
      <div className="fai-loading-glow" />

      {/* Dual SVG Spinner Unit */}
      <div className="fai-spinner-unit" aria-hidden="true">
        {/* Outer Clockwise Ring */}
        <svg className="fai-spinner-outer" fill="none" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r="26"
            stroke="var(--surface-container-highest)"
            strokeWidth="3"
          />
          <path
            d="M58 32C58 17.6406 46.3594 6 32 6"
            stroke="var(--primary)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Inner Counter-Rotating Ring */}
        <svg className="fai-spinner-inner" fill="none" viewBox="0 0 36 36">
          <path
            d="M30 18C30 11.3726 24.6274 6 18 6"
            stroke="var(--secondary)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Center AI Sparkle */}
        <span className="material-symbols-outlined fai-spinner-sparkle">
          auto_awesome
        </span>
      </div>

      {/* Headings */}
      <h2 className="fai-loading-title">Generating your recipe...</h2>
      <p className="fai-loading-sub">
        Gemini is checking your fridge and synthesizing macro-balanced combinations...
      </p>

      {/* Live AI Thinking Steps */}
      <div className="fai-thinking-steps">
        {/* Step 1: Complete */}
        <div className="fai-thinking-step complete">
          <div className="fai-step-icon-circle">
            <span className="material-symbols-outlined" style={{ fontSize: '15px', fontWeight: 'bold' }}>
              check
            </span>
          </div>
          <div className="fai-step-body">
            <div className="fai-step-top">
              <span className="fai-step-label">Parsed pantry items</span>
              <span className="fai-step-status-tag complete">Complete</span>
            </div>
          </div>
        </div>

        {/* Step 2: Active */}
        <div className="fai-thinking-step active">
          <div className="fai-step-icon-circle">
            <span className="fai-ping-dot" />
          </div>
          <div className="fai-step-body">
            <div className="fai-step-top">
              <span className="fai-step-label">
                Finding optimal flavor profiles & cook times
              </span>
              <span className="fai-step-status-tag active">Computing</span>
            </div>
            <div className="fai-sub-progress-track">
              <div className="fai-sub-progress-fill" />
            </div>
          </div>
        </div>

        {/* Step 3: Queued */}
        <div className="fai-thinking-step queued">
          <div className="fai-step-icon-circle">
            <span className="fai-queued-dot" />
          </div>
          <div className="fai-step-body">
            <div className="fai-step-top">
              <span className="fai-step-label">
                Structuring step-by-step guide & ingredient swaps
              </span>
              <span className="fai-step-status-tag queued">Queued</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Status Stream Footer */}
      <div className="fai-loading-telemetry">
        <span className="fai-telemetry-badge">
          <span className="material-symbols-outlined">memory</span>
          <span>Model: Gemini 1.5 Pro</span>
        </span>
      </div>
    </div>
  );
}
