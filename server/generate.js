import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Generate a recipe using Gemini AI based on user ingredients.
 *
 * @param {string} ingredients - Raw string of ingredients provided by the user.
 * @returns {Promise<Object>} Validated recipe object.
 */
export async function generateRecipe(ingredients) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not defined in environment variables');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const modelName = process.env.GEMINI_MODEL || 'gemini-3.6-flash';
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature: 0.7
    }
  });

  const prompt = `You are a recipe generator. Return ONLY valid JSON — no markdown, no prose, no backticks.

The user has these ingredients: "${ingredients}"

Return exactly this JSON shape:
{
  "title": "string — recipe name",
  "description": "string — one sentence about the dish",
  "servings": number (default 2),
  "prepTime": "string e.g. 10 mins",
  "cookTime": "string e.g. 20 mins",
  "ingredients": [
    {
      "id": "string — unique e.g. ing_1",
      "name": "string — ingredient name",
      "quantity": number,
      "unit": "string — e.g. grams, cups, tbsp, pieces",
      "perServing": number (quantity divided by servings)
    }
  ],
  "steps": [
    {
      "id": "string — unique e.g. step_1",
      "order": number (1-based),
      "instruction": "string — clear cooking instruction",
      "duration": "string — e.g. 5 mins (or null if no wait time)"
    }
  ],
  "swaps": [
    {
      "id": "string — unique e.g. swap_1",
      "original": "string — ingredient to replace",
      "substitute": "string — what to use instead",
      "reason": "string — why this works"
    }
  ],
  "tips": ["string", "string"]
}

Rules:
- ingredients array: include both the user-provided ingredients AND any extras needed
- steps array: exactly 4 to 8 steps
- swaps array: exactly 3 ingredient swap suggestions
- tips array: exactly 2 cooking tips
- perServing = quantity / servings (calculate this)
- Return ONLY the JSON object, nothing else`;

  const result = await model.generateContent(prompt);
  let rawText = result.response.text();

  // Parsing logic:
  // 1. Strip leading/trailing whitespace
  rawText = (rawText || '').trim();

  // 2. Strip ```json or ``` wrappers if present
  if (rawText.startsWith('```json')) {
    rawText = rawText.slice(7);
  } else if (rawText.startsWith('```')) {
    rawText = rawText.slice(3);
  }

  if (rawText.endsWith('```')) {
    rawText = rawText.slice(0, -3);
  }

  rawText = rawText.trim();

  // 3. JSON.parse the result
  // If parse fails: throw Error("MALFORMED_JSON")
  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch (error) {
    throw new Error('MALFORMED_JSON');
  }

  // 4. Validate: must have title (string), servings (number), ingredients (array),
  //    steps (array), swaps (array)
  // If validation fails: throw Error("WRONG_SHAPE")
  const isValid =
    parsed !== null &&
    typeof parsed === 'object' &&
    typeof parsed.title === 'string' &&
    typeof parsed.servings === 'number' &&
    Array.isArray(parsed.ingredients) &&
    Array.isArray(parsed.steps) &&
    Array.isArray(parsed.swaps);

  if (!isValid) {
    throw new Error('WRONG_SHAPE');
  }

  // 5. Return parsed object
  return parsed;
}

export default generateRecipe;
