import React, { useState, useEffect } from 'react';

/**
 * SavedRecipes Component
 * Displays the user's bookmarked recipes saved in localStorage.
 *
 * @param {Object} props
 * @param {(recipe: Object) => void} props.onSelectRecipe - Callback to open recipe in RecipeView.
 * @param {() => void} props.onBack - Callback to return to search/generator.
 */
export default function SavedRecipes({ onSelectRecipe, onBack }) {
  const [savedList, setSavedList] = useState([]);

  const loadSaved = () => {
    try {
      const items = JSON.parse(localStorage.getItem('fridgeai_saved_recipes') || '[]');
      setSavedList(Array.isArray(items) ? items : []);
    } catch {
      setSavedList([]);
    }
  };

  useEffect(() => {
    loadSaved();
  }, []);

  const handleRemove = (e, title) => {
    e.stopPropagation();
    try {
      const filtered = savedList.filter((r) => r.title !== title);
      localStorage.setItem('fridgeai_saved_recipes', JSON.stringify(filtered));
      setSavedList(filtered);
    } catch (err) {
      console.error('Failed to remove saved recipe:', err);
    }
  };

  return (
    <section className="fai-saved-section" aria-labelledby="fai-saved-heading">
      {/* Header */}
      <div className="fai-card-header" style={{ marginBottom: '16px' }}>
        <div className="fai-card-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '24px' }}>
              bookmark
            </span>
            <h2 id="fai-saved-heading" className="fai-card-title" style={{ fontSize: '22px' }}>
              Saved Recipes
            </h2>
          </div>
          <span className="fai-card-subtitle" style={{ fontSize: '13px', marginTop: '2px' }}>
            {savedList.length} recipe{savedList.length === 1 ? '' : 's'} in your personal cookbook
          </span>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="fai-btn-secondary"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
            add
          </span>
          <span>New Recipe</span>
        </button>
      </div>

      {/* Empty State */}
      {savedList.length === 0 ? (
        <div
          style={{
            backgroundColor: 'var(--surface-container)',
            border: '1px solid rgba(60, 74, 66, 0.4)',
            borderRadius: 'var(--radius-card)',
            padding: '48px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--surface-container-highest)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--outline)',
              marginBottom: '4px'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
              bookmark_border
            </span>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>
            No saved recipes yet
          </h3>

          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '400px' }}>
            Generate a recipe from your ingredients and tap the <strong>Save</strong> button to keep it in your personal collection.
          </p>

          <button
            type="button"
            onClick={onBack}
            className="fai-submit-btn"
            style={{ marginTop: '12px' }}
          >
            <span className="material-symbols-outlined">restaurant</span>
            <span>Create a Recipe</span>
          </button>
        </div>
      ) : (
        /* Saved Recipes Grid */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px'
          }}
        >
          {savedList.map((recipe, index) => (
            <div
              key={recipe.title || index}
              onClick={() => onSelectRecipe(recipe)}
              className="fai-feature-card"
              style={{
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '20px',
                gap: '14px'
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectRecipe(recipe);
                }
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                  <span className="fai-verified-pill" style={{ marginBottom: '8px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>verified</span>
                    <span>AI Formula</span>
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleRemove(e, recipe.title)}
                    className="fai-reset-steps-btn"
                    style={{ minWidth: '32px', height: '28px', padding: '0 8px' }}
                    title="Remove from saved"
                    aria-label={`Remove ${recipe.title} from saved`}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--outline)' }}>
                      delete
                    </span>
                  </button>
                </div>

                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: 'var(--title-highlight)',
                    marginBottom: '6px',
                    lineHeight: '1.3'
                  }}
                >
                  {recipe.title}
                </h3>

                {recipe.description && (
                  <p
                    style={{
                      fontSize: '13px',
                      lineHeight: '20px',
                      color: 'var(--text-secondary)',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {recipe.description}
                  </p>
                )}
              </div>

              {/* Meta bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(60, 74, 66, 0.4)',
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}
              >
                <span>⏱ {recipe.prepTime || '10m'} prep • {recipe.cookTime || '20m'} cook</span>
                <span style={{ color: 'var(--primary)', fontWeight: '600' }}>
                  View →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
