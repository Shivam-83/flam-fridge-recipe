import React from 'react';

/**
 * Formats a numeric quantity up to 2 decimal places.
 * If the value is a whole number, displays without trailing decimal zeros.
 *
 * @param {number} val
 * @returns {string}
 */
function formatQuantity(val) {
  if (typeof val !== 'number' || Number.isNaN(val)) return '0';
  const rounded = Math.round((val + Number.EPSILON) * 100) / 100;
  return rounded.toString();
}

/**
 * IngredientsList Component
 * Matches Stitch Desktop & Mobile Recipe Ingredients UI.
 * Scaling formula: scaledQuantity = ingredient.perServing * servings
 *
 * @param {Object} props
 * @param {Array} [props.ingredients=[]]
 * @param {number} [props.servings=2]
 * @param {number} [props.baseServings=2]
 */
export default function IngredientsList({
  ingredients = [],
  servings = 2,
  baseServings = 2
}) {
  const currentServings = Number(servings) || 2;
  const base = Number(baseServings) || 2;
  const isScaled = currentServings !== base;
  const scaleFactor = (currentServings / base).toFixed(1).replace(/\.0$/, '');

  return (
    <div className="fai-ingredients-panel">
      {/* Header */}
      <div className="fai-card-header">
        <div className="fai-card-title-group">
          <h2 className="fai-card-title">
            Ingredients for {currentServings} serving{currentServings === 1 ? '' : 's'}
          </h2>
          <span className="fai-card-subtitle">Freshly scaled measurements</span>
        </div>

        {isScaled ? (
          <span className="fai-scaling-tag">Scaled x{scaleFactor}</span>
        ) : (
          <span className="fai-scaling-tag">Base Formula</span>
        )}
      </div>

      {/* Ingredients List */}
      <div className="fai-ingredients-list" role="list">
        {ingredients.map((ingredient, index) => {
          const basePerServing =
            typeof ingredient.perServing === 'number'
              ? ingredient.perServing
              : (Number(ingredient.quantity) || 0) / (base || 1);

          const scaledValue = basePerServing * currentServings;
          const scaledDisplay = formatQuantity(scaledValue);
          const originalDisplay = formatQuantity(ingredient.quantity);
          const unitText = ingredient.unit ? ` ${ingredient.unit}` : '';

          return (
            <div key={ingredient.id || index} className="fai-ingredient-row" role="listitem">
              <div className="fai-ing-name-wrap">
                <span className="fai-ing-name">{ingredient.name}</span>
                {isScaled && (
                  <span className="fai-ing-base-strikethrough">
                    {originalDisplay}{unitText} {ingredient.name}
                  </span>
                )}
              </div>

              <span className="fai-ing-scaled-qty">
                {scaledDisplay}{unitText}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer Info Note */}
      <div className="fai-ing-helper-note">
        <span className="material-symbols-outlined">info</span>
        <span>Pantry proportions automatically rounded for standard kitchen scoops.</span>
      </div>
    </div>
  );
}
