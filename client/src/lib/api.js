/**
 * Base API URL configured via environment variable with fallback to local server.
 */
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');

/**
 * Generates a recipe from ingredients by calling the Express backend.
 *
 * @param {string} ingredients - Comma-separated or free-form ingredient list.
 * @returns {Promise<Object>} The recipe data from the server.
 * @throws {Error} "NETWORK_ERROR", "SERVER_ERROR", or server response error message.
 */
export async function generateRecipe(ingredients) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 35000);

  let response;
  try {
    response = await fetch(`${API_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ingredients }),
      signal: controller.signal
    });
  } catch (err) {
    throw new Error('NETWORK_ERROR');
  } finally {
    clearTimeout(timeoutId);
  }

  if (response.status !== 200) {
    throw new Error('SERVER_ERROR');
  }

  let json;
  try {
    json = await response.json();
  } catch (err) {
    throw new Error('SERVER_ERROR');
  }

  if (json.success === false) {
    throw new Error(json.error || 'SERVER_ERROR');
  }

  return json.data;
}

export default generateRecipe;
