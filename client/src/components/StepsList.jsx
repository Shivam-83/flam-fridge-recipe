import React, { useState } from 'react';

/**
 * StepsList Component
 * Matches Stitch Desktop & Mobile Cooking Steps UI.
 * Interactive checkboxes, auto-advancing active step, progress bar, and reset.
 *
 * @param {Object} props
 * @param {Array<{id: string, order: number, instruction: string, duration?: string|null}>} [props.steps=[]]
 */
export default function StepsList({ steps = [] }) {
  const [checkedSteps, setCheckedSteps] = useState(new Set());
  const [activeStep, setActiveStep] = useState(0);

  // Always sorted by step.order ascending
  const sortedSteps = [...steps].sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

  const totalCount = sortedSteps.length;
  const checkedCount = sortedSteps.filter((s) => checkedSteps.has(s.id)).length;
  const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  /**
   * Toggles completion for a step. Auto-advances activeStep to next incomplete step.
   */
  const handleToggleStep = (stepId, currentIndex) => {
    setCheckedSteps((prev) => {
      const next = new Set(prev);
      const isCurrentlyChecked = next.has(stepId);

      if (isCurrentlyChecked) {
        next.delete(stepId);
        setActiveStep(currentIndex);
      } else {
        next.add(stepId);

        // Auto-advance to next incomplete step after current
        const nextIncompleteIndex = sortedSteps.findIndex(
          (s, idx) => idx > currentIndex && !next.has(s.id)
        );

        if (nextIncompleteIndex !== -1) {
          setActiveStep(nextIncompleteIndex);
        } else {
          // Wrap around: find any remaining unchecked
          const anyIncompleteIndex = sortedSteps.findIndex((s) => !next.has(s.id));
          if (anyIncompleteIndex !== -1) {
            setActiveStep(anyIncompleteIndex);
          }
          // If all completed, progressPercent reaches 100%
        }
      }

      return next;
    });
  };

  /**
   * Resets all steps to uncompleted and sets activeStep to 0.
   */
  const handleReset = () => {
    setCheckedSteps(new Set());
    setActiveStep(0);
  };

  return (
    <div className="fai-steps-panel">
      {/* Header Row */}
      <div className="fai-steps-header-row">
        <h2 className="fai-card-title">Cooking Steps</h2>
        <button
          type="button"
          onClick={handleReset}
          className="fai-reset-steps-btn"
          aria-label="Reset cooking steps"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>refresh</span>
          <span>Reset</span>
        </button>
      </div>

      {/* Progress Bar Tracker */}
      <div className="fai-steps-progress-wrap">
        <div className="fai-steps-progress-stats">
          <span className="fai-progress-text">
            {checkedCount} of {totalCount} steps complete
          </span>
          <span className="fai-progress-badge">{progressPercent}%</span>
        </div>
        <div
          className="fai-progress-track"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="fai-progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Steps List */}
      <div className="fai-steps-container" role="list">
        {sortedSteps.map((step, index) => {
          const isChecked = checkedSteps.has(step.id);
          const isActive = index === activeStep && !isChecked;
          const stepNumberStr = String(index + 1).padStart(2, '0');

          let cardStateClass = 'upcoming';
          if (isChecked) cardStateClass = 'completed';
          else if (isActive) cardStateClass = 'active';

          return (
            <div
              key={step.id || index}
              className={`fai-step-card ${cardStateClass}`}
              onClick={() => setActiveStep(index)}
              role="listitem"
            >
              {/* Checkbox / Step Badge */}
              <button
                type="button"
                className="fai-step-checkbox-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleStep(step.id, index);
                }}
                aria-label={`Mark step ${index + 1} as ${isChecked ? 'incomplete' : 'completed'}`}
              >
                <span className="fai-step-num-circle">
                  {isChecked ? (
                    <span className="material-symbols-outlined" style={{ fontSize: '15px', fontWeight: 'bold' }}>
                      check
                    </span>
                  ) : (
                    stepNumberStr
                  )}
                </span>
              </button>

              {/* Step Body */}
              <div className="fai-step-content">
                <div className="fai-step-meta-row">
                  <span className="fai-step-order-tag">
                    {isActive ? `STEP ${stepNumberStr} • CURRENT` : `STEP ${stepNumberStr}`}
                  </span>
                  {step.duration && (
                    <span className="fai-step-timing">{step.duration}</span>
                  )}
                </div>

                <p className="fai-step-text">
                  {step.instruction}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
