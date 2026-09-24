# FridgeAI — AI-Powered Recipe Generator

## What it does

FridgeAI transforms leftover ingredients found in your kitchen into chef-crafted, zero-waste recipes using Google Gemini AI. 

- **Natural Language Input**: Enter whatever ingredients you have on hand.
- **Interactive Cooking Steps**: Follow sorted, numbered steps with real-time progress tracking, time estimates, and active step highlighting.
- **Dynamic Servings Scaler**: Scale portion yields between 1 and 20 servings with instant recalculation of all ingredient measurements.
- **Ingredient Swaps**: Review contextual substitution suggestions with clipboard copy support.
- **Reliable Fallbacks**: Built-in offline quick-picks and resilient error recovery when internet connectivity is interrupted.

---

## Tech Stack

- **Frontend**: React 18, Vite, React Hooks, Functional Components, Vanilla CSS
- **Backend**: Node.js, Express (CORS-enabled API Proxy)
- **AI Engine**: Google Gemini 1.5 Flash via `@google/generative-ai`
- **Development Tools**: Google Antigravity IDE
- **UI/UX Design**: Google Stitch

---

## Project Structure

```text
flam-fridge-recipe/
├── client/                         # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── IngredientInput.jsx # Input textarea, character counter, quick chips
│   │   │   ├── RecipeView.jsx      # Recipe layout, recap bar, metadata, tips
│   │   │   ├── IngredientsList.jsx # Scaled ingredient list with strikethrough base values
│   │   │   ├── StepsList.jsx       # Interactive checkable steps & progress bar
│   │   │   ├── ServingsControl.jsx # Servings increment/decrement (1–20)
│   │   │   ├── SwapPanel.jsx       # Ingredient substitution cards with copy action
│   │   │   ├── SavedRecipes.jsx    # Personal cookbook saved in localStorage
│   │   │   ├── LoadingState.jsx    # Dual-ring SVG spinner & AI thinking timeline
│   │   │   └── ErrorState.jsx      # Error telemetry & offline quick-picks grid
│   │   ├── lib/
│   │   │   ├── api.js              # Fetch client with 35s hard timeout
│   │   │   └── validateResult.js   # Client-side schema validation guard
│   │   ├── App.jsx                 # Root application state orchestrator
│   │   ├── App.css                 # Stitch design system tokens & responsive styles
│   │   └── main.jsx                # React DOM entry point
│   ├── index.html                  # HTML entry with Inter & Material Symbols fonts
│   ├── vite.config.js
│   └── package.json
├── server/                         # Express Backend Proxy
│   ├── index.js                    # Server setup, CORS, timeout middleware
│   ├── generate.js                 # Gemini SDK prompt & JSON parsing/sanitization
│   ├── .env                        # Local environment variables (git-ignored)
│   └── package.json
├── .env.example                    # Sample environment template
├── DESIGN.md                       # Complete design system specification from Stitch
└── README.md
```

---

## Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- A Google Gemini API key ([Get a free key here](https://aistudio.google.com/app/apikey))

### 1. Clone & Environment Configuration
```bash
git clone <repository-url>
cd flam-fridge-recipe
cp .env.example server/.env
```
Open `server/.env` and add your API key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=3001
```

### 2. Start the Backend
```bash
cd server
npm install
node index.js
```
*The Express server runs on `http://localhost:3001`.*

### 3. Start the Frontend
Open a new terminal window:
```bash
cd client
npm install
npm run dev
```
*Open [http://localhost:5173](http://localhost:5173) in your browser.*

---

## How to Use

1. **Enter Ingredients**: Type the ingredients you currently have (comma-separated or natural language) into the input box, or click the quick-add chips.
2. **Generate Recipe**: Click **"Find a Recipe"** (or press `Enter`).
3. **Scale Servings**: Adjust servings with the `−` and `+` stepper buttons (clamped between 1 and 20). All quantities scale automatically using `perServing × servings`.
4. **Track Cooking**: Check off steps as you complete them; the progress bar updates and automatically advances to the next step.
5. **View Substitutions**: Check the **Ingredient Swaps** section for pantry-friendly alternatives and copy them directly to your clipboard.
6. **Save for Later**: Click **"Save"** to keep favorite recipes in your personal cookbook.

---

## AI and Development Tools Usage

The project was developed with the assistance of multiple AI-powered development tools:

- **Claude**: Used for assistance with application architecture, JSON data structure, component planning, Gemini prompt design, and coding guidance.
- **ChatGPT**: Used for project planning, debugging, code generation, implementation guidance, error handling, and reviewing development decisions.
- **Google Antigravity IDE**: Used as the primary AI-assisted development environment for implementing, modifying, debugging, and reviewing the project code.
- **Google Stitch**: Used to design the application's UI screens, visual layout, responsive design, components, colors, typography, and overall user experience.
- **Google Gemini**: Used as the AI recipe-generation engine through the backend API.

All generated code was reviewed, tested, and understood during development.

---

## AI Failure Modes & Resilient Architecture

Building reliable production applications on top of non-deterministic LLMs requires treating failure as a first-class citizen. FridgeAI implements a multi-layered defense against common AI failure modes:

| Failure Mode | Root Cause / Risk | How FridgeAI Handles It |
| :--- | :--- | :--- |
| **Markdown Fences & Preamble** | LLMs often output ` ```json ` fences or conversational chatter despite instructions. | Regex extraction and JSON block sanitization in [server/generate.js](file:///c:/Users/Asus/Downloads/flam-fridge-recipe/server/generate.js) before parsing. |
| **Malformed / Truncated JSON** | Model token limits or sudden stream terminations produce syntax errors. | Safe `try/catch` wrapping returning standardized structured error objects with actionable user codes (`MALFORMED_JSON`). |
| **Schema Inconsistency / Hallucination** | Model omits required fields or outputs unexpected types (e.g., missing steps array). | Client-side schema validator ([client/src/lib/validateResult.js](file:///c:/Users/Asus/Downloads/flam-fridge-recipe/client/src/lib/validateResult.js)) rejects invalid shapes before rendering. |
| **API Latency & Hanging Requests** | Network congestion or LLM cold starts cause spinners to hang indefinitely. | Dual timeout guards: 30s backend abort controller + 35s hard client fetch timeout ([client/src/lib/api.js](file:///c:/Users/Asus/Downloads/flam-fridge-recipe/client/src/lib/api.js)). |
| **Rate Limits & Capacity (429 / 503)** | API quotas or high upstream traffic trigger upstream rejections. | Specific user-facing telemetry and actionable recovery tips instead of blank screens. |
| **Offline / Network Disconnection** | User is in a kitchen with poor connectivity or offline. | Dynamic **Offline Quick-Picks** fallback grid loaded with instant zero-waste recipes. |
| **Race Conditions (Stale Responses)** | User rapidly fires multiple requests or edits ingredients mid-flight. | Request ID / active query tracking discards out-of-order responses. |

---

## Known Limitations

- **Markdown Wrapping**: Gemini occasionally wraps JSON responses in markdown code fences despite strict prompting instructions. Robust regex strip logic handles most cases, but extreme edge cases trigger the friendly `MALFORMED_JSON` error state.
- **Quantity Rounding**: Scaled quantities round to a maximum of 2 decimal places, which can feel imprecise for tiny measurements (e.g., `0.08 tsp`).
- **Unit Conversions**: No automatic unit conversions exist (e.g., cups remain cups when scaling rather than converting to pints or quarts).
- **Free-Tier Rate Limits**: The Gemini free tier has rate limits; rapid back-to-back requests can result in a 429 rate limit or temporary 503 capacity limit.

---

## Time Spent

**Total: ~7.5 hours**
- **1.0h**: Project requirements review, schema definition, and JSON shape design.
- **2.0h**: Express proxy implementation, prompt engineering, and response sanitization.
- **2.5h**: React UI components (interactive steps, servings scaler, swap panel).
- **1.5h**: Error state handling, stale request race condition guard, and mobile responsive tuning.
- **0.5h**: Documentation, testing, and final cleanup.

---

## What I'd Do Next

- **Unit Conversion**: Automatic unit upgrading when scaling (e.g., converting 16 tablespoons to 1 cup, or cups to ml).
- **Multi-Recipe Choices**: Generate 2–3 recipe variations per query (e.g., Quick & Easy vs. Gourmet).
- **Nutritional Breakdown**: Estimated calories and macronutrient profiles based on portion sizes.
- **Print / PDF Export**: Clean, print-friendly stylesheet for hands-free kitchen use.

---

## Security

- **Server-Side API Key Storage**: The `GEMINI_API_KEY` is strictly confined to `server/.env`.
- **Zero Client Exposure**: The API key is never bundled, exposed, or accessed within the React client application; all Gemini interactions are proxied through Express.
- **Git Protection**: `server/.env` is ignored by Git to prevent accidental credential leakage.
