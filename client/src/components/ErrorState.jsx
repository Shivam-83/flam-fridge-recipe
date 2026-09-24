import React from 'react';

/**
 * Pre-defined offline pantry-friendly fallback recipes matching Stitch Error State.
 */
export const OFFLINE_RECIPES = [
  {
    id: 'offline_omelette',
    title: 'Garlic Cheddar Pan Omelette',
    description: 'A quick, fluffy pan omelette bursting with sautéed garlic and melted sharp cheddar cheese.',
    servings: 2,
    prepTime: '5 mins',
    cookTime: '10 mins',
    matchText: 'Matches 5 of 7 ingredients',
    matchType: 'emerald',
    subText: 'Ready in 10 mins • High Protein',
    badge: 'Instant Prep',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE4x2SPYR3kCNhcmRfMpeaoJNj4cWnfRH5QF9Q_se6zoy9N-uUxDN4TpRYxJB6ieAz5mkv-WV3m85mGyUSOOgObHQB1i4E3hmub7wHrhw-73cWKoDFmyBpPLqUe1i9on62-YQ8KVovW9UH9TmTup1cfcsreVt4nh8daW_ueiINpjytNnp3FmHGa1Qc4B6J69HwE1sd8Xcwsfdik3himhPjWRvUCFi5OGjddiQK8C2hu2xnj4VASUJ4',
    ingredients: [
      { id: 'off_1', name: 'Eggs', quantity: 4, unit: 'pieces', perServing: 2 },
      { id: 'off_2', name: 'Cheddar Cheese', quantity: 100, unit: 'grams', perServing: 50 },
      { id: 'off_3', name: 'Garlic, minced', quantity: 2, unit: 'cloves', perServing: 1 },
      { id: 'off_4', name: 'Butter', quantity: 2, unit: 'tbsp', perServing: 1 },
      { id: 'off_5', name: 'Salt & Pepper', quantity: 1, unit: 'tsp', perServing: 0.5 }
    ],
    steps: [
      { id: 'step_off_1', order: 1, instruction: 'Whisk eggs thoroughly with salt and pepper until light and frothy.', duration: '2 mins' },
      { id: 'step_off_2', order: 2, instruction: 'Melt butter in a non-stick skillet over medium-low heat and cook minced garlic until fragrant (30 seconds).', duration: '1 min' },
      { id: 'step_off_3', order: 3, instruction: 'Pour in whisked eggs, gently lifting the edges with a spatula so uncooked egg flows underneath.', duration: '4 mins' },
      { id: 'step_off_4', order: 4, instruction: 'Sprinkle grated cheddar over half of the omelette, fold over gently, and serve hot.', duration: '2 mins' }
    ],
    swaps: [
      { id: 'swap_off_1', original: 'Cheddar Cheese', substitute: 'Parmesan or Mozzarella', reason: 'Melts cleanly and gives a mild savory pull.' },
      { id: 'swap_off_2', original: 'Butter', substitute: 'Olive Oil', reason: 'Lighter alternative with subtle fruitiness.' },
      { id: 'swap_off_3', original: 'Garlic', substitute: 'Shallots or Chives', reason: 'Fresh herbaceous aroma without heavy pungent kick.' }
    ],
    tips: [
      'Low and slow: Keep heat low so eggs stay velvety without browning harshly.',
      'Fold early: Fold while the top is slightly glossy for the creamiest center.'
    ]
  },
  {
    id: 'offline_biscuits',
    title: 'Quick Cheddar Drop Biscuits',
    description: 'Golden, savory drop biscuits with melted cheddar, crisp edges, and a warm buttery crumb.',
    servings: 4,
    prepTime: '8 mins',
    cookTime: '15 mins',
    matchText: 'Matches 4 of 7 ingredients',
    matchType: 'amber',
    subText: 'Bake 18 mins • Comfort Bakery',
    badge: 'Pantry Classic',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEYkGj2nNvuZiQxKI4e5pk9C0ZV0n8bQ-SyUxH2quDgBuv9G-V5kEuvAhzZg2iO42AxuOUdjMyyoQrp3V6uQIVG40ZMvZfhsb1bxQzv55reWZjIgGXx-kafkeKJSE57x0U_jUMrka9BQ1Dj3tHwtdyjnk3Fo7AfJ27SC7sCyT1KIV3Of9XuWHAd6-TnRFPwgRRAZo-FzwzOdlut0uKDm4z4KHFxuHC3f_n-ttw0pEEuzc_Le9Szqbi',
    ingredients: [
      { id: 'off_b1', name: 'All-purpose Flour', quantity: 2, unit: 'cups', perServing: 0.5 },
      { id: 'off_b2', name: 'Baking Powder', quantity: 1, unit: 'tbsp', perServing: 0.25 },
      { id: 'off_b3', name: 'Cold Butter', quantity: 4, unit: 'tbsp', perServing: 1 },
      { id: 'off_b4', name: 'Shredded Cheddar', quantity: 1, unit: 'cup', perServing: 0.25 },
      { id: 'off_b5', name: 'Milk', quantity: 1, unit: 'cup', perServing: 0.25 },
      { id: 'off_b6', name: 'Garlic Powder', quantity: 0.5, unit: 'tsp', perServing: 0.125 }
    ],
    steps: [
      { id: 'step_b1', order: 1, instruction: 'Preheat oven to 425°F (220°C) and line a baking sheet with parchment paper.', duration: '5 mins' },
      { id: 'step_b2', order: 2, instruction: 'Whisk flour, baking powder, and garlic powder in a bowl, then cut in cold butter until pea-sized crumbs form.', duration: '4 mins' },
      { id: 'step_b3', order: 3, instruction: 'Fold in shredded cheddar and pour in milk, stirring gently just until dough comes together.', duration: '2 mins' },
      { id: 'step_b4', order: 4, instruction: 'Drop 8 large spoonfuls onto prepared sheet and bake until tops are golden brown.', duration: '14 mins' }
    ],
    swaps: [
      { id: 'swap_b1', original: 'Whole Milk', substitute: 'Buttermilk or Oat Milk', reason: 'Adds pleasant tang or keeps the biscuits dairy-free.' },
      { id: 'swap_b2', original: 'Cheddar', substitute: 'Gouda or Pepper Jack', reason: 'Adds smoky depth or a subtle spicy kick.' },
      { id: 'swap_b3', original: 'Butter', substitute: 'Solid Coconut Oil', reason: 'Cold fat substitute preserving flaky biscuit texture.' }
    ],
    tips: [
      'Keep butter cold: Cold butter pockets melt in the oven, creating tender flaky air pockets.',
      'Do not overmix: Handle dough minimally to ensure biscuits stay soft rather than dense.'
    ]
  }
];

/**
 * Maps known error codes to friendly strings per spec.
 *
 * @param {string} code
 * @returns {string}
 */
function getFriendlyErrorMessage(code) {
  if (!code) {
    return 'Could not reach the server. Check your connection or verify that your ingredients list contains recognizable food items.';
  }

  const normalized = String(code).trim();

  switch (normalized) {
    case 'NETWORK_ERROR':
      return 'Could not reach the server. Check your connection or verify that your ingredients list contains recognizable food items.';
    case 'MALFORMED_JSON':
      return 'The AI returned an unexpected format. Try again.';
    case 'WRONG_SHAPE':
      return 'The AI response was incomplete. Try again.';
    case 'SERVER_ERROR':
      return 'Server error. Try again in a moment.';
    default:
      return normalized;
  }
}

/**
 * ErrorState Component
 * Matches Stitch Desktop & Mobile Error State design with Connection Advisory
 * and Offline Quick-Picks fallback inspiration grid.
 *
 * @param {Object} props
 * @param {string} props.message - Error code or message.
 * @param {() => void} [props.onRetry] - Callback to retry generation.
 * @param {() => void} [props.onEdit] - Callback to return to input editing.
 * @param {(recipe: Object) => void} [props.onSelectOfflineRecipe] - Callback when clicking an offline recipe.
 */
export default function ErrorState({
  message,
  onRetry,
  onEdit,
  onSelectOfflineRecipe
}) {
  const friendlyMessage = getFriendlyErrorMessage(message);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* 1. Main Error Alert Card */}
      <section className="fai-error-section" role="alert">
        <div className="fai-error-glow" />

        <div className="fai-error-icon-wrap" aria-hidden="true">
          <span className="material-symbols-outlined">error</span>
        </div>

        <h2 className="fai-error-heading">Couldn't generate recipe</h2>
        <p className="fai-error-body">{friendlyMessage}</p>

        {/* Visual Diagnostic Telemetry */}
        <div className="fai-diagnostic-card">
          <div className="fai-diag-top">
            <span>Request Flow</span>
            <span className="fai-diag-fail">Stage 3 Failed</span>
          </div>
          <div className="fai-diag-bars">
            <div className="fai-diag-bar ok" />
            <div className="fai-diag-bar ok" />
            <div className="fai-diag-bar fail" />
          </div>
          <div className="fai-diag-labels">
            <span>Pantry Parsed</span>
            <span>Filter Applied</span>
            <span>Model Response</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="fai-error-actions">
          {typeof onRetry === 'function' && (
            <button
              type="button"
              onClick={onRetry}
              className="fai-retry-btn"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                replay
              </span>
              <span>Try Again</span>
            </button>
          )}

          {typeof onEdit === 'function' && (
            <button
              type="button"
              onClick={onEdit}
              className="fai-edit-btn"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                edit_note
              </span>
              <span>Edit Ingredients</span>
            </button>
          )}
        </div>

        {/* Connection Advisory Hint Box */}
        <div className="fai-advisory-box">
          <span className="material-symbols-outlined">lightbulb</span>
          <div className="fai-advisory-text">
            <span className="fai-advisory-tag">Connection Advisory</span>
            <p className="fai-advisory-body">
              Tip: Make sure you're connected to the internet. Gemini API requests may momentarily time out during peak server load or unstable network handshakes.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Fallback Inspiration Grid: Offline Quick-Picks */}
      <section className="fai-offline-section" aria-labelledby="fai-offline-title">
        <div className="fai-offline-header">
          <div className="fai-offline-title-row">
            <span className="material-symbols-outlined">offline_bolt</span>
            <h3 id="fai-offline-title" className="fai-card-title">
              Offline Quick-Picks
            </h3>
          </div>
          <span className="fai-offline-subtitle">Cached from your pantry</span>
        </div>

        <div className="fai-offline-grid">
          {OFFLINE_RECIPES.map((recipe) => (
            <div
              key={recipe.id}
              className="fai-offline-card"
              onClick={() => {
                if (typeof onSelectOfflineRecipe === 'function') {
                  onSelectOfflineRecipe(recipe);
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (typeof onSelectOfflineRecipe === 'function') {
                    onSelectOfflineRecipe(recipe);
                  }
                }
              }}
            >
              <div className="fai-offline-thumb">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="fai-offline-img"
                  loading="lazy"
                />
              </div>

              <div className="fai-offline-content">
                <span className={`fai-offline-match ${recipe.matchType}`}>
                  {recipe.matchText}
                </span>
                <h4 className="fai-offline-name">{recipe.title}</h4>
                <p className="fai-offline-desc">{recipe.subText}</p>
                <span className="fai-offline-tag">{recipe.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
