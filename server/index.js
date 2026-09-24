import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateRecipe } from './generate.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const TIMEOUT_MS = 30000;

// Configurable CORS origins with support for Vercel, Netlify, and local dev
const customAllowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : [];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, postman, server-to-server)
      if (!origin) return callback(null, true);

      const isAllowed =
        customAllowedOrigins.includes('*') ||
        customAllowedOrigins.includes(origin) ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1') ||
        origin.endsWith('.vercel.app') ||
        origin.endsWith('.netlify.app') ||
        origin.endsWith('.onrender.com');

      if (isAllowed) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());

/**
 * Health check endpoints for Render and monitoring tools.
 */
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'FridgeAI API', timestamp: new Date().toISOString() });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

/**
 * Helper to wrap any async operation in a hard timeout.
 *
 * @param {Promise<any>} promise
 * @param {number} ms
 * @returns {Promise<any>}
 */
function withTimeout(promise, ms = TIMEOUT_MS) {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`Request timed out after ${ms / 1000} seconds`));
    }, ms);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timeoutId);
  });
}

// POST /api/generate
app.post('/api/generate', async (req, res) => {
  req.setTimeout(TIMEOUT_MS);
  res.setTimeout(TIMEOUT_MS);

  try {
    const { ingredients } = req.body || {};

    if (typeof ingredients !== 'string' || ingredients.trim() === '') {
      const errorMsg = 'Invalid request body: "ingredients" must be a non-empty string.';
      console.error(`[Error 400] /api/generate: ${errorMsg}`);
      return res.status(400).json({ success: false, error: errorMsg });
    }

    // Call generate.js with 30s timeout
    const recipeData = await withTimeout(generateRecipe(ingredients.trim()), TIMEOUT_MS);

    return res.json({
      success: true,
      data: recipeData
    });
  } catch (error) {
    console.error('[Error] /api/generate failed:', error);

    const statusCode = error.message && error.message.includes('timed out') ? 504 : 500;
    return res.status(statusCode).json({
      success: false,
      error: error.message || 'Failed to generate recipe'
    });
  }
});

// Start Express server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
