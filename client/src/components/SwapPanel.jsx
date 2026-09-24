import React, { useState } from 'react';

/**
 * SwapPanel Component
 * Matches Stitch Desktop & Mobile Ingredient Swaps UI.
 *
 * @param {Object} props
 * @param {Array<{id: string, original: string, substitute: string, reason: string}>} [props.swaps=[]]
 */
export default function SwapPanel({ swaps = [] }) {
  const [copiedId, setCopiedId] = useState(null);

  if (!swaps || swaps.length === 0) return null;

  const handleCopy = async (swap, id) => {
    const textToCopy = `${swap.original} → ${swap.substitute}`;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
        setCopiedId(id);
        setTimeout(() => {
          setCopiedId((prev) => (prev === id ? null : prev));
        }, 2000);
      }
    } catch {
      // Gracefully ignore clipboard failures
    }
  };

  return (
    <section className="fai-swaps-panel" aria-labelledby="fai-swaps-title">
      {/* Swaps Header */}
      <div className="fai-swaps-header">
        <div className="fai-swaps-heading-wrap">
          <div className="fai-swaps-title-row">
            <span className="material-symbols-outlined">swap_horiz</span>
            <h2 id="fai-swaps-title" className="fai-card-title">
              Ingredient Swaps
            </h2>
          </div>
          <span className="fai-swaps-sub">
            Pantry-friendly alternatives suggested by Gemini
          </span>
        </div>

        <span className="fai-swaps-count-badge">
          {swaps.length} swap{swaps.length === 1 ? '' : 's'} available
        </span>
      </div>

      {/* 3-Column Swaps Grid */}
      <div className="fai-swaps-grid">
        {swaps.map((swap, index) => {
          const id = swap.id || index;
          const isCopied = copiedId === id;

          return (
            <div key={id} className="fai-swap-card">
              <div>
                <div className="fai-swap-pair">
                  <span>{swap.original}</span>
                  <span className="fai-swap-arrow" aria-hidden="true">⇄</span>
                  <span>{swap.substitute}</span>
                </div>
                {swap.reason && (
                  <p className="fai-swap-desc">{swap.reason}</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleCopy(swap, id)}
                className={`fai-swap-copy-btn ${isCopied ? 'copied' : ''}`}
                aria-label={`Copy swap from ${swap.original} to ${swap.substitute}`}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  {isCopied ? 'check' : 'content_copy'}
                </span>
                <span>{isCopied ? 'Copied!' : 'Copy swap'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
