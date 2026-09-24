import React, { useState, useRef } from 'react';
import IngredientInput from './components/IngredientInput.jsx';
import RecipeView from './components/RecipeView.jsx';
import LoadingState from './components/LoadingState.jsx';
import ErrorState from './components/ErrorState.jsx';
import SavedRecipes from './components/SavedRecipes.jsx';
import { generateRecipe } from './lib/api.js';
import { validateRecipe } from './lib/validateResult.js';
import './App.css';

/**
 * App Component
 * Root component managing state and rendering for FridgeAI matching Stitch specifications.
 */
export default function App() {
  // Application state: 'idle' | 'loading' | 'error' | 'result'
  const [appState, setAppState] = useState('idle');
  const [ingredientText, setIngredientText] = useState('');
  const [recipeData, setRecipeData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [servings, setServings] = useState(null);

  // Stale request guard & retry tracker
  const requestId = useRef(0);
  const lastIngredientsRef = useRef('');

  /**
   * Generates a recipe from ingredient text with stale request guarding.
   *
   * @param {string} text - Comma-separated or natural language ingredients.
   */
  const handleGenerate = async (text) => {
    const trimmed = (text || ingredientText).trim();
    if (!trimmed) return;

    requestId.current += 1;
    const localId = requestId.current;
    lastIngredientsRef.current = trimmed;
    setIngredientText(trimmed);

    // Transition to loading
    setAppState('loading');
    setErrorMessage(null);
    setRecipeData(null);
    setServings(null);

    try {
      const data = await generateRecipe(trimmed);

      // Stale response guard
      if (localId !== requestId.current) return;

      const validation = validateRecipe(data);

      if (!validation.valid) {
        setErrorMessage(validation.reason);
        setAppState('error');
        return;
      }

      setRecipeData(validation.data);
      setServings(validation.data.servings || 2);
      setAppState('result');
    } catch (err) {
      if (localId !== requestId.current) return;
      setErrorMessage(err?.message || 'SERVER_ERROR');
      setAppState('error');
    }
  };

  /**
   * Adjusts servings count clamped between 1 and 20.
   */
  const handleServingsChange = (newServings) => {
    const clamped = Math.min(20, Math.max(1, Number(newServings) || 1));
    setServings(clamped);
  };

  /**
   * Retries generating with the last queried ingredients.
   */
  const handleRetry = () => {
    if (lastIngredientsRef.current) {
      handleGenerate(lastIngredientsRef.current);
    }
  };

  /**
   * Allows user to edit their current ingredient input.
   */
  const handleEdit = () => {
    setAppState('idle');
  };

  /**
   * Resets app to clean idle state for a new recipe.
   */
  const handleNewRecipe = () => {
    setIngredientText('');
    setRecipeData(null);
    setErrorMessage(null);
    setServings(null);
    setAppState('idle');
  };

  return (
    <div className="fai-app-wrapper">
      {/* ── GLOBAL FIXED HEADER ── */}
      <header className="fai-header">
        <div className="fai-header-inner">
          {/* Brand Logo & Title */}
          <div className="fai-brand-group">
            <div className="fai-logo-icon" aria-hidden="true">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                kitchen
              </span>
            </div>
            <div className="fai-brand-text">
              <div className="fai-brand-row">
                <span className="fai-brand-title">FridgeAI</span>
                <span className="fai-gemini-badge">
                  <span className="fai-pulse-dot" />
                  Gemini Powered
                </span>
              </div>
              <span className="fai-tagline">Turn what you have into something delicious</span>
            </div>
          </div>

          {/* Navigation & Avatar */}
          <div className="fai-nav-group">
            <nav className="fai-nav-links" aria-label="Main Navigation">
              <button
                type="button"
                onClick={handleNewRecipe}
                className={`fai-nav-link ${appState !== 'saved' ? 'active' : ''}`}
                style={{ background: 'none', padding: 0 }}
              >
                Recipes
              </button>
              <button
                type="button"
                onClick={() => setAppState('saved')}
                className={`fai-nav-link ${appState === 'saved' ? 'active' : ''}`}
                style={{ background: 'none', padding: 0 }}
              >
                Saved
              </button>
            </nav>
            <div
              className="fai-avatar"
              aria-label="View saved recipes"
              onClick={() => setAppState('saved')}
              style={{ cursor: 'pointer' }}
              title="View saved recipes"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                bookmark
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="fai-main">
        <div className="fai-container">
          {/* Ambient Glow */}
          <div className="fai-ambient-glow" aria-hidden="true" />

          {/* 1. IDLE STATE: Hero section + Input form + Feature cards */}
          {appState === 'idle' && (
            <>
              <section className="fai-hero">
                <div className="fai-engine-badge">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    auto_awesome
                  </span>
                  <span>AI Culinary Engine</span>
                  <span className="fai-engine-badge-sep" />
                  <span className="fai-engine-version">v2.4 Instant</span>
                </div>

                <h1 className="fai-hero-title">
                  What can you cook with what you have?
                </h1>

                <p className="fai-hero-subtitle">
                  Tell us what’s in your fridge and FridgeAI will engineer an artisan, zero-waste recipe in seconds.
                </p>
              </section>

              <IngredientInput
                value={ingredientText}
                onChange={setIngredientText}
                onSubmit={handleGenerate}
                onGenerate={handleGenerate}
                disabled={false}
                isLoading={false}
              />

              {/* Value Proposition Cards */}
              <section className="fai-features-section">
                <div className="fai-features-grid">
                  {/* Feature 1 */}
                  <div className="fai-feature-card">
                    <div className="fai-feature-icon-box" style={{ color: 'var(--primary)' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>eco</span>
                    </div>
                    <h2 className="fai-feature-title">Instant Recipe Match</h2>
                    <p className="fai-feature-desc">
                      Zero-waste precision culinary logic. Generate chef-grade meals utilizing what’s about to spoil first.
                    </p>
                    <div className="fai-feature-footer" style={{ color: 'var(--primary)' }}>
                      <span>98% Waste Reduced</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="fai-feature-card">
                    <div className="fai-feature-icon-box" style={{ color: 'var(--secondary)' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>tune</span>
                    </div>
                    <h2 className="fai-feature-title">Smart Scaling</h2>
                    <p className="fai-feature-desc">
                      Dynamically adjust meal portions on the fly without breaking hydration or spice ratios.
                    </p>
                    <div className="fai-feature-footer" style={{ color: 'var(--secondary)' }}>
                      <span>Adaptive Yields</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="fai-feature-card">
                    <div className="fai-feature-icon-box" style={{ color: 'var(--tertiary)' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>published_with_changes</span>
                    </div>
                    <h2 className="fai-feature-title">Ingredient Swaps</h2>
                    <p className="fai-feature-desc">
                      Missing heavy cream or buttermilk? Get chemical &amp; flavor-compatible substitutions instantly.
                    </p>
                    <div className="fai-feature-footer" style={{ color: 'var(--tertiary)' }}>
                      <span>Flavor Pair Safety</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* 2. LOADING STATE: Preserved disabled input + elevated loading card */}
          {appState === 'loading' && (
            <>
              <IngredientInput
                value={ingredientText}
                onChange={setIngredientText}
                onSubmit={handleGenerate}
                onGenerate={handleGenerate}
                disabled={true}
                isLoading={true}
              />
              <LoadingState />
            </>
          )}

          {/* 3. ERROR STATE: Retained input area + diagnostic error card */}
          {appState === 'error' && (
            <>
              <IngredientInput
                value={ingredientText}
                onChange={setIngredientText}
                onSubmit={handleGenerate}
                onGenerate={handleGenerate}
                disabled={false}
                isLoading={false}
              />
              <ErrorState
                message={errorMessage}
                onRetry={handleRetry}
                onEdit={handleEdit}
                onSelectOfflineRecipe={(offlineRecipe) => {
                  setRecipeData(offlineRecipe);
                  setServings(offlineRecipe.servings || 2);
                  setAppState('result');
                }}
              />
            </>
          )}

          {/* 4. RESULT STATE: Generated Recipe view */}
          {appState === 'result' && recipeData && (
            <RecipeView
              recipe={recipeData}
              recipeData={recipeData}
              servings={servings}
              onServingsChange={handleServingsChange}
              onNewRecipe={handleNewRecipe}
              onEditRecipe={handleEdit}
              usedIngredientsText={lastIngredientsRef.current}
            />
          )}

          {/* 5. SAVED RECIPES STATE */}
          {appState === 'saved' && (
            <SavedRecipes
              onSelectRecipe={(recipe) => {
                setRecipeData(recipe);
                setServings(recipe.servings || 2);
                setAppState('result');
              }}
              onBack={() => setAppState('idle')}
            />
          )}
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="fai-footer">
        <div className="fai-footer-inner">
          <div className="fai-footer-copy">
            <span className="fai-footer-dot" />
            <span>&copy; 2026 FridgeAI. Intelligent culinary inventory.</span>
          </div>

          <div className="fai-footer-tech">
            <span className="fai-tech-pill">React</span>
            <span className="fai-tech-sep">•</span>
            <span className="fai-tech-pill">Express</span>
            <span className="fai-tech-sep">•</span>
            <span className="fai-tech-pill primary">Gemini AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
