import React from 'react';
import IngredientsList from './IngredientsList.jsx';
import StepsList from './StepsList.jsx';
import ServingsControl from './ServingsControl.jsx';
import SwapPanel from './SwapPanel.jsx';

/**
 * RecipeView Component
 * Matches Stitch Desktop & Mobile Generated Recipe specification.
 *
 * @param {Object} props
 * @param {Object} props.recipe - Generated recipe data object.
 * @param {Object} [props.recipeData] - Alternate prop for recipe.
 * @param {number} props.servings - Active servings count.
 * @param {(newServings: number) => void} props.onServingsChange
 * @param {() => void} [props.onNewRecipe] - Callback for New Recipe button.
 * @param {() => void} [props.onEditRecipe] - Callback for Edit button.
 * @param {string} [props.usedIngredientsText] - Optional string of input ingredients.
 */
export default function RecipeView({
  recipe,
  recipeData,
  servings,
  onServingsChange,
  onNewRecipe,
  onEditRecipe,
  usedIngredientsText
}) {
  const currentRecipe = recipe || recipeData;
  if (!currentRecipe) return null;

  const baseServings = currentRecipe.servings || 2;
  const currentServings = servings || baseServings;
  const tips = Array.isArray(currentRecipe.tips) && currentRecipe.tips.length > 0
    ? currentRecipe.tips
    : [
        'Reserve pasta water: Save a 1/2 cup before draining. The starchy water helps emulsify the sauce into a restaurant-quality glaze.',
        'Control the heat: Add garlic to warm butter on medium-low heat until fragrant (about 60 seconds) before adding tomatoes.'
      ];

  // Derive used ingredients summary text
  const recapText = usedIngredientsText
    ? usedIngredientsText
    : (currentRecipe.ingredients || []).map((i) => i.name).slice(0, 6).join(', ');

  // Save to localStorage state
  const [isSaved, setIsSaved] = React.useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('fridgeai_saved_recipes') || '[]');
      return saved.some((r) => r.title === currentRecipe.title);
    } catch {
      return false;
    }
  });

  const [isShared, setIsShared] = React.useState(false);

  const handleToggleSave = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('fridgeai_saved_recipes') || '[]');
      if (isSaved) {
        const filtered = saved.filter((r) => r.title !== currentRecipe.title);
        localStorage.setItem('fridgeai_saved_recipes', JSON.stringify(filtered));
        setIsSaved(false);
      } else {
        saved.push({ ...currentRecipe, savedAt: new Date().toISOString() });
        localStorage.setItem('fridgeai_saved_recipes', JSON.stringify(saved));
        setIsSaved(true);
      }
    } catch (err) {
      console.error('Could not access localStorage:', err);
    }
  };

  const handleShare = async () => {
    const summary = `🍳 ${currentRecipe.title}\n${currentRecipe.description || ''}\n\nPrep: ${currentRecipe.prepTime || '10 mins'} | Cook: ${currentRecipe.cookTime || '20 mins'}\nGenerated with FridgeAI`;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(summary);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      }
    } catch {
      // Ignore clipboard error
    }
  };

  return (
    <article className="fai-recipe-view" aria-label="Generated Recipe">
      {/* 1. TOP BAR / INGREDIENT RECAP */}
      <section className="fai-recap-bar">
        <div className="fai-recap-left">
          <div className="fai-recap-icon" aria-hidden="true">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              kitchen
            </span>
          </div>
          <div className="fai-recap-text-wrap">
            <span className="fai-recap-tag">Used ingredients:</span>
            <span className="fai-recap-items">{recapText}</span>
          </div>
        </div>

        <div className="fai-recap-actions">
          {typeof onEditRecipe === 'function' && (
            <button
              type="button"
              onClick={onEditRecipe}
              className="fai-btn-secondary"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>edit</span>
              <span>Edit</span>
            </button>
          )}

          {typeof onNewRecipe === 'function' && (
            <button
              type="button"
              onClick={onNewRecipe}
              className="fai-btn-primary-sm"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>auto_awesome</span>
              <span>New Recipe</span>
            </button>
          )}
        </div>
      </section>

      {/* 2. RECIPE HEADER & METADATA SECTION */}
      <header className="fai-recipe-header">
        <div className="fai-header-top-row">
          <div>
            <div className="fai-verified-pill">
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>verified</span>
              <span>Tested &amp; Verified AI Formula</span>
            </div>
            <h1 className="fai-recipe-title">{currentRecipe.title}</h1>
          </div>

          <div className="fai-header-btns">
            <button
              type="button"
              onClick={handleToggleSave}
              className="fai-header-btn"
              style={isSaved ? { borderColor: 'var(--primary)', color: 'var(--primary)' } : undefined}
              title={isSaved ? 'Recipe saved (click to unsave)' : 'Save recipe to local device'}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: '18px',
                  fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0",
                  color: isSaved ? 'var(--primary)' : 'inherit'
                }}
              >
                {isSaved ? 'bookmark' : 'bookmark_border'}
              </span>
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="fai-header-btn"
              style={isShared ? { borderColor: 'var(--primary)', color: 'var(--primary)' } : undefined}
              title="Copy recipe details to clipboard"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                {isShared ? 'check' : 'share'}
              </span>
              <span>{isShared ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {currentRecipe.description && (
          <p className="fai-recipe-description">{currentRecipe.description}</p>
        )}

        {/* Metadata Row */}
        <div className="fai-metadata-bar">
          <div className="fai-meta-stats">
            {/* Prep Time */}
            <div className="fai-stat-item">
              <div className="fai-stat-icon-wrap prep">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>schedule</span>
              </div>
              <div className="fai-stat-text">
                <span className="fai-stat-label">Prep</span>
                <span className="fai-stat-value">{currentRecipe.prepTime || '10 mins'}</span>
              </div>
            </div>

            <div className="fai-stat-divider" />

            {/* Cook Time */}
            <div className="fai-stat-item">
              <div className="fai-stat-icon-wrap cook">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>local_fire_department</span>
              </div>
              <div className="fai-stat-text">
                <span className="fai-stat-label">Cook</span>
                <span className="fai-stat-value">{currentRecipe.cookTime || '20 mins'}</span>
              </div>
            </div>

            <div className="fai-stat-divider" />

            {/* Base Servings badge */}
            <div className="fai-stat-item">
              <div className="fai-stat-icon-wrap formula">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>group</span>
              </div>
              <div className="fai-stat-text">
                <span className="fai-stat-label">Formula</span>
                <span className="fai-stat-value">{baseServings} servings base</span>
              </div>
            </div>
          </div>

          {/* Integrated Servings Control Stepper */}
          <ServingsControl
            servings={currentServings}
            onChange={onServingsChange}
            baseServings={baseServings}
          />
        </div>
      </header>

      {/* 3. RECIPE CONTENT: TWO-COLUMN LAYOUT (5 cols / 7 cols) */}
      <div className="fai-recipe-grid">
        <IngredientsList
          ingredients={currentRecipe.ingredients}
          servings={currentServings}
          baseServings={baseServings}
        />
        <StepsList steps={currentRecipe.steps} />
      </div>

      {/* 4. INGREDIENT SWAPS SECTION */}
      {currentRecipe.swaps && currentRecipe.swaps.length > 0 && (
        <SwapPanel swaps={currentRecipe.swaps} />
      )}

      {/* 5. COOKING TIPS SECTION */}
      {tips.length > 0 && (
        <section className="fai-tips-panel" aria-labelledby="fai-tips-title">
          <div className="fai-tips-title-row">
            <span className="material-symbols-outlined">lightbulb</span>
            <h2 id="fai-tips-title" className="fai-card-title">Cooking Tips</h2>
          </div>

          <div className="fai-tips-grid">
            {tips.map((tip, index) => {
              // Parse leading bold phrase if formatted like "Heading: Text"
              const parts = tip.split(/:\s*(.*)/s);
              const hasPrefix = parts.length > 1;
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="fai-tip-card">
                  <div className={`fai-tip-icon-circle ${isEven ? 'amber' : 'emerald'}`}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                      {isEven ? 'water_drop' : 'skillet'}
                    </span>
                  </div>
                  <p className="fai-tip-text">
                    {hasPrefix ? (
                      <>
                        <strong>{parts[0]}: </strong>
                        {parts[1]}
                      </>
                    ) : (
                      tip
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
}
