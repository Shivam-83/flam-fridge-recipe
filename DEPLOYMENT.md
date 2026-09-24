# Manual Deployment Guide: Render & Vercel

This guide walks you through deploying **FridgeAI** manually to:
1. **Render** for the Express Node.js Backend API
2. **Vercel** for the React + Vite Frontend UI

---

## Part 1: Deploy Backend to Render

### Step 1: Push Code to GitHub / GitLab
Make sure your latest code is pushed to your Git repository:
```bash
git add .
git commit -m "feat: deployment ready for Vercel and Render"
git push origin main
```

### Step 2: Create a New Web Service on Render
1. Go to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** → select **Web Service**.
3. Connect your repository.
4. Fill in the following deployment settings:
   - **Name**: `fridgeai-backend` (or your preferred name)
   - **Region**: Choose the closest region to your users
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js` (or `npm start`)
   - **Instance Type**: `Free`

### Step 3: Add Environment Variables on Render
Under the **Environment Variables** section, add:
| Key | Value | Description |
|---|---|---|
| `GEMINI_API_KEY` | `your_actual_gemini_api_key` | Your Google Gemini API Key |
| `GEMINI_MODEL` | `gemini-1.5-flash` | Reliable production model |
| `PORT` | `10000` | Render default port (automatically assigned) |
| `ALLOWED_ORIGINS` | `*` | Or specify your Vercel URL once deployed |

### Step 4: Deploy & Copy Service URL
1. Click **Deploy Web Service**.
2. Wait for the build and deployment to complete.
3. Test your backend: Open `https://<your-render-app-name>.onrender.com/` in your browser. You should see:
   ```json
   { "status": "ok", "service": "FridgeAI API" }
   ```
4. Copy your backend URL: e.g. `https://fridgeai-backend.onrender.com`.

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Import Project into Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** → **Project**.
3. Import your `flam-fridge-recipe` repository.

### Step 2: Configure Project Settings
In the **Configure Project** screen:
- **Project Name**: `fridgeai` (or your choice)
- **Framework Preset**: `Vite`
- **Root Directory**: Click **Edit** and select `client` *(Alternatively, leave blank because root `vercel.json` is preconfigured)*.
- **Build and Output Settings**:
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Install Command: `npm install`

### Step 3: Set Environment Variable
Under the **Environment Variables** accordion, add:
| Key | Value |
|---|---|
| `VITE_API_URL` | `https://<your-render-app-name>.onrender.com` |

*(Replace with your actual Render backend URL from Part 1 with no trailing slash)*.

### Step 4: Deploy & Verify
1. Click **Deploy**.
2. Vercel will build the frontend and provide your live URL (e.g. `https://fridgeai.vercel.app`).
3. Visit your live URL and test generating a recipe!

---

## Verification Checklist

- [ ] `https://<backend>.onrender.com/api/health` returns `{"status":"healthy"}`
- [ ] Vercel app loads without CORS errors in browser DevTools Console
- [ ] Generating recipes with ingredients calls the Render backend and returns the recipe
- [ ] Servings scaler, cooking steps checklist, ingredient swaps, and save functionality work as expected
- [ ] Reloading any page on Vercel serves `index.html` without 404 errors (handled by `vercel.json`)
