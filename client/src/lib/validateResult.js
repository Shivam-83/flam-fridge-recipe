/**
 * Validates the recipe object shape and content returned from the API.
 *
 * @param {any} data - Response data to validate.
 * @returns {{ valid: true, data: Object } | { valid: false, reason: string }}
 */
export function validateRecipe(data) {
  // Check: data is a non-null object
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return {
      valid: false,
      reason: 'Recipe data must be a non-null object.'
    };
  }

  // Check: data.title is a non-empty string
  if (typeof data.title !== 'string' || data.title.trim() === '') {
    return {
      valid: false,
      reason: 'Recipe title must be a non-empty string.'
    };
  }

  // Check: data.servings is a positive number
  if (typeof data.servings !== 'number' || Number.isNaN(data.servings) || data.servings <= 0) {
    return {
      valid: false,
      reason: 'Recipe servings must be a positive number.'
    };
  }

  // Check: data.ingredients is a non-empty array
  if (!Array.isArray(data.ingredients) || data.ingredients.length === 0) {
    return {
      valid: false,
      reason: 'Recipe ingredients must be a non-empty array.'
    };
  }

  // Check: each ingredient has id, name (strings), quantity (number), unit (string)
  for (let i = 0; i < data.ingredients.length; i += 1) {
    const ingredient = data.ingredients[i];
    if (!ingredient || typeof ingredient !== 'object' || Array.isArray(ingredient)) {
      return {
        valid: false,
        reason: `Ingredient at index ${i} must be a non-null object.`
      };
    }

    if (typeof ingredient.id !== 'string' || ingredient.id.trim() === '') {
      return {
        valid: false,
        reason: `Ingredient at index ${i} must have a valid string "id".`
      };
    }

    if (typeof ingredient.name !== 'string' || ingredient.name.trim() === '') {
      return {
        valid: false,
        reason: `Ingredient at index ${i} must have a non-empty string "name".`
      };
    }

    if (typeof ingredient.quantity !== 'number' || Number.isNaN(ingredient.quantity)) {
      return {
        valid: false,
        reason: `Ingredient "${ingredient.name || i}" must have a numeric "quantity".`
      };
    }

    if (typeof ingredient.unit !== 'string') {
      return {
        valid: false,
        reason: `Ingredient "${ingredient.name || i}" must have a string "unit".`
      };
    }
  }

  // Check: data.steps is a non-empty array
  if (!Array.isArray(data.steps) || data.steps.length === 0) {
    return {
      valid: false,
      reason: 'Recipe steps must be a non-empty array.'
    };
  }

  // Check: each step has id, order (number), instruction (non-empty string)
  for (let i = 0; i < data.steps.length; i += 1) {
    const step = data.steps[i];
    if (!step || typeof step !== 'object' || Array.isArray(step)) {
      return {
        valid: false,
        reason: `Step at index ${i} must be a non-null object.`
      };
    }

    if (typeof step.id !== 'string' || step.id.trim() === '') {
      return {
        valid: false,
        reason: `Step at index ${i} must have a valid string "id".`
      };
    }

    if (typeof step.order !== 'number' || Number.isNaN(step.order)) {
      return {
        valid: false,
        reason: `Step at index ${i} must have a numeric "order".`
      };
    }

    if (typeof step.instruction !== 'string' || step.instruction.trim() === '') {
      return {
        valid: false,
        reason: `Step at index ${i} must have a non-empty string "instruction".`
      };
    }
  }

  // Check: data.swaps is an array (can be empty)
  if (!Array.isArray(data.swaps)) {
    return {
      valid: false,
      reason: 'Recipe swaps must be an array.'
    };
  }

  // Check: each swap has original, substitute, reason (all strings)
  for (let i = 0; i < data.swaps.length; i += 1) {
    const swap = data.swaps[i];
    if (!swap || typeof swap !== 'object' || Array.isArray(swap)) {
      return {
        valid: false,
        reason: `Swap at index ${i} must be a non-null object.`
      };
    }

    if (typeof swap.original !== 'string' || swap.original.trim() === '') {
      return {
        valid: false,
        reason: `Swap at index ${i} must have a non-empty string "original".`
      };
    }

    if (typeof swap.substitute !== 'string' || swap.substitute.trim() === '') {
      return {
        valid: false,
        reason: `Swap at index ${i} must have a non-empty string "substitute".`
      };
    }

    if (typeof swap.reason !== 'string' || swap.reason.trim() === '') {
      return {
        valid: false,
        reason: `Swap at index ${i} must have a non-empty string "reason".`
      };
    }
  }

  // If all pass: return { valid: true, data }
  return {
    valid: true,
    data
  };
}

export default validateRecipe;
