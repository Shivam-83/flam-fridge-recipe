import React from 'react';

/**
 * ServingsControl Component
 * Matches Stitch Servings Stepper specification.
 * Clamps servings between 1 and 20.
 *
 * @param {Object} props
 * @param {number} props.servings - Current servings count.
 * @param {(newServings: number) => void} props.onChange - Handler called on increment/decrement.
 * @param {number} [props.baseServings=2] - Original recipe base servings count.
 */
export default function ServingsControl({
  servings = 2,
  onChange,
  baseServings = 2
}) {
  const currentServings = Number(servings) || 2;
  const isMinusDisabled = currentServings <= 1;
  const isPlusDisabled = currentServings >= 20;

  const handleDecrement = () => {
    if (!isMinusDisabled && typeof onChange === 'function') {
      const next = Math.max(1, currentServings - 1);
      onChange(next);
    }
  };

  const handleIncrement = () => {
    if (!isPlusDisabled && typeof onChange === 'function') {
      const next = Math.min(20, currentServings + 1);
      onChange(next);
    }
  };

  const isScaled = Boolean(baseServings && currentServings !== baseServings);

  return (
    <div className="fai-servings-box" role="group" aria-label="Servings control">
      <div className="fai-servings-labels">
        <span className="fai-servings-title">Servings</span>
        <span className="fai-servings-scaled-tag">
          {isScaled ? `scaled from ${baseServings}` : `${baseServings} base`}
        </span>
      </div>

      <div className="fai-stepper-wrap">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={isMinusDisabled}
          aria-label="Decrease servings"
          className="fai-step-btn"
        >
          −
        </button>

        <span className="fai-servings-number" aria-live="polite">
          {currentServings}
        </span>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={isPlusDisabled}
          aria-label="Increase servings"
          className="fai-step-btn"
        >
          +
        </button>
      </div>
    </div>
  );
}
