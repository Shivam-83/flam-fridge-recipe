import React, { useState } from 'react';

const MAX_CHAR_COUNT = 400;

const SUGGESTED_CHIPS = [
  'Eggs',
  'Tomato',
  'Onion',
  'Rice',
  'Chicken',
  'Potato'
];

/**
 * IngredientInput Component
 * Matches Stitch Desktop & Mobile Home designs.
 *
 * @param {Object} props
 * @param {string} [props.value]
 * @param {(val: string) => void} [props.onChange]
 * @param {(ingredientsText: string) => void} props.onSubmit
 * @param {(ingredientsText: string) => void} [props.onGenerate]
 * @param {boolean} [props.disabled=false]
 * @param {boolean} [props.isLoading=false]
 */
export default function IngredientInput({
  value,
  onChange,
  onSubmit,
  onGenerate,
  disabled = false,
  isLoading = false
}) {
  const [internalText, setInternalText] = useState('');
  const text = value !== undefined ? value : internalText;
  const setText = (val) => {
    if (onChange) onChange(val);
    if (value === undefined) setInternalText(val);
  };

  const isInputDisabled = disabled || isLoading;
  const isBlank = text.trim().length === 0;
  const isButtonDisabled = isInputDisabled || isBlank;
  const submitHandler = onSubmit || onGenerate;

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || isInputDisabled) return;
    if (typeof submitHandler === 'function') {
      submitHandler(trimmed);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChipClick = (chip) => {
    if (isInputDisabled) return;
    const current = text.trim();
    let updated = '';
    if (current.length === 0) {
      updated = chip;
    } else if (current.endsWith(',')) {
      updated = `${current} ${chip}`;
    } else {
      updated = `${current}, ${chip}`;
    }
    setText(updated.slice(0, MAX_CHAR_COUNT));
  };

  return (
    <div className="fai-input-section">
      <form onSubmit={handleSubmit} className="fai-input-card">
        {/* Card Header */}
        <div className="fai-input-header">
          <div className="fai-input-label-wrap">
            <span className="material-symbols-outlined">kitchen</span>
            <label htmlFor="fai-ingredient-input" className="fai-input-label">
              Your Available Ingredients
            </label>
          </div>
          <div className="fai-nl-pill">
            <span className="material-symbols-outlined">psychology</span>
            <span>Natural Language Input</span>
          </div>
        </div>

        {/* Textarea */}
        <textarea
          id="fai-ingredient-input"
          className="fai-textarea"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_CHAR_COUNT))}
          onKeyDown={handleKeyDown}
          disabled={isInputDisabled}
          maxLength={MAX_CHAR_COUNT}
          placeholder="List your ingredients, e.g: 2 eggs, flour, butter, milk, sugar, half an onion..."
          rows={4}
          aria-label="Fridge ingredients input"
        />

        {/* Card Footer Toolbar */}
        <div className="fai-input-footer">
          <div className="fai-input-hint">
            <span className="material-symbols-outlined">info</span>
            <span>Separate ingredients with commas or natural lines</span>
          </div>

          <div className="fai-input-actions">
            <span className="fai-char-count" aria-live="polite">
              {text.length} / {MAX_CHAR_COUNT}
            </span>

            <button
              type="submit"
              disabled={isButtonDisabled}
              className="fai-submit-btn"
            >
              <span className="material-symbols-outlined">restaurant</span>
              <span>Find a Recipe</span>
            </button>
          </div>
        </div>
      </form>

      {/* Need ideas? Quick-add chips */}
      <div className="fai-chips-section" style={{ marginTop: '16px' }}>
        <span className="fai-chips-label">Need ideas? Try adding:</span>
        <div className="fai-chips-wrap">
          {SUGGESTED_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleChipClick(chip)}
              disabled={isInputDisabled}
              className="fai-chip"
            >
              <span className="fai-chip-plus">+</span>
              <span>{chip}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
