# FridgeAI Design System & Specification

> **Source of Truth**: Extracted directly from the Stitch FridgeAI project (`projects/7436140089189257397`).

---

## 1. Color Tokens (Dark Theme / Material 3 Derivative)

The color palette is built on deep slate backgrounds paired with fresh emerald/mint primary accents, warm amber accents for culinary/cooking warmth, and clear semantic states.

### Core Backgrounds & Surfaces
| Token | Hex | Role / Usage |
|---|---|---|
| `background` | `#10141a` | Main application canvas background |
| `surface` | `#10141a` | Base surface layer |
| `surface-dim` | `#10141a` | Recessed surface shade |
| `surface-bright` | `#353940` | Hover states on interactive dark elements |
| `surface-container-lowest`| `#0a0e14` | Fixed header backdrop, textarea background, telemetry cards |
| `surface-container-low` | `#181c22` | Primary card panels, ingredient lists, recap banner |
| `surface-container` | `#1c2026` | Standard container level, swap cards, tips cards, steppers |
| `surface-container-high` | `#262a31` | Elevated elements, active step card, error container |
| `surface-container-highest`| `#31353c` | Button backgrounds, borders, progress bar tracks |
| `surface-variant` | `#31353c` | Surface alternative grouping |

### Primary Accent (Emerald / Fresh Mint)
| Token | Hex | Role / Usage |
|---|---|---|
| `primary` | `#4edea3` | Vibrant accent text, scaled quantity text, active step numbers, icons |
| `primary-container` | `#10b981` | Primary CTA button background, step progress bar fill, completed check badges |
| `on-primary` | `#003824` | Text/icons on `primary` surfaces |
| `on-primary-container` | `#00422b` | Text/icons on `primary-container` CTA buttons and badges |
| `primary-fixed` | `#6ffbbe` | Fixed accent tone for badges |
| `primary-fixed-dim` | `#4edea3` | Dim accent tone |

### Secondary Accent (Teal / Sage)
| Token | Hex | Role / Usage |
|---|---|---|
| `secondary` | `#68dba9` | Sub-accent icons, features, counter-spinning ring in loader |
| `secondary-container` | `#25a475` | Hover state for primary buttons (`hover:bg-secondary-container`) |
| `on-secondary` | `#003825` | Text/icons on `secondary` surfaces |
| `on-secondary-container` | `#00311f` | Text on secondary container elements |

### Tertiary Accent (Warm Amber / Fire & Cooking)
| Token | Hex | Role / Usage |
|---|---|---|
| `tertiary` | `#ffb95f` | Cook time fire icon, cooking tips bulb icon, caution accents |
| `tertiary-container` | `#e29100` | Background container for tip badges (`bg-tertiary-container/20`) |
| `on-tertiary` | `#472a00` | Contrast text on amber tones |

### Semantic / Error State
| Token | Hex | Role / Usage |
|---|---|---|
| `error` | `#ffb4ab` | Error icon, error alert messages, diagnostic pulse bar |
| `error-container` | `#93000a` | Background container for error circular badge (`bg-error-container/30`) |
| `on-error` | `#690005` | Text on error surfaces |

### Typography & Outline Tones
| Token | Hex | Role / Usage |
|---|---|---|
| `title-highlight` | `#F0FDF4` | Prominent recipe titles and bold numerical indicators |
| `on-surface` | `#dfe2eb` | Main body copy, headings, primary card titles |
| `on-surface-variant` | `#bbcabf` | Subheadings, secondary copy, metadata descriptors |
| `outline` | `#86948a` | Strikethrough base ingredients, placeholder text, inactive steps |
| `outline-variant` | `#3c4a42` | Card borders, dividers, subtle separators |

---

## 2. Typography

- **Font Family**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Icon Set**: `Material Symbols Outlined` (Google Fonts, variable weights, `FILL: 0` or `FILL: 1` on featured badges)

### Type Scale & Tokens
| Scale Token | Font Size | Line Height | Weight | Letter Spacing | Purpose |
|---|---|---|---|---|---|
| `display-lg` | `40px` | `48px` | `700` (Bold) | `-0.02em` | Hero heading (Desktop) |
| `display-lg-mobile` | `30px` | `38px` | `700` (Bold) | `-0.015em` | Hero heading (Mobile) |
| `headline-lg` | `28px` | `36px` | `600` (SemiBold) | `-0.015em` | Generated Recipe title (`#F0FDF4`) |
| `headline-md` | `22px` | `30px` | `600` (SemiBold) | `-0.01em` | Section titles, Error title, Servings number |
| `headline-sm` | `18px` | `26px` | `600` (SemiBold) | `-0.005em` | Card titles ("Ingredients", "Cooking Steps") |
| `body-lg` | `16px` | `26px` | `400` (Regular) | `normal` | Recipe description, Textarea input text |
| `body-md` | `14px` | `22px` | `400` (Regular) | `normal` | Step descriptions, swap details, tip body |
| `body-sm` | `12px` | `18px` | `400` (Regular) | `normal` | Strikethrough base values, helper copy |
| `label-lg` | `16px` | `24px` | `500` / `600` | `normal` | Primary CTA button text ("Find a Recipe", "Try Again") |
| `label-md` | `14px` | `20px` | `500` | `normal` | Navigation links, chip tags, secondary buttons |
| `label-sm` | `11px` | `16px` | `600` (SemiBold) | `+0.04em` | Uppercase section badges, step numbers, timestamps |

---

## 3. Spacing & Sizing Scale

### Tokenized Spacing
- `space-xs`: `0.25rem` (`4px`)
- `space-sm`: `0.5rem` (`8px`)
- `space-md`: `1rem` (`16px`)
- `space-lg`: `1.5rem` (`24px`)
- `space-xl`: `2rem` (`32px`)

### Layout Constraints
- Max Content Width: `max-w-[800px]` (centered horizontally with `mx-auto`)
- Desktop Container Padding: `px-4 sm:px-6`
- Header Height: `h-16` (`64px`), content offset `pt-16`

---

## 4. Border Radius

- `DEFAULT`: `0.25rem` (`4px`) — minor tags, step timing badges
- `lg`: `0.5rem` (`8px`) — buttons, input fields, step cards, chip containers
- `xl`: `0.75rem` (`12px`) — major cards, sections, modal containers, telemetry cards
- `full`: `9999px` — pills, rounded icons, avatar, progress bar capsules

---

## 5. Buttons & Interactive Controls

### Primary CTA Button (e.g. "Find a Recipe", "Try Again")
- **Active State**:
  - Background: `bg-primary-container` (`#10b981`)
  - Text: `text-on-primary-container` (`#00422b`), font `label-lg`, `font-bold` / `font-semibold`
  - Dimensions: `min-h-[44px] h-11 px-6` (or `min-w-[200px]` on error/loading actions)
  - Radius: `rounded-lg` (`8px`)
  - Shadow: `shadow-md`
  - Hover: `hover:bg-secondary-container` (`#25a475`), `hover:shadow-lg`
  - Active: `active:scale-[0.98]`
- **Disabled State**:
  - Background: `bg-surface-container-highest` (`#31353c`)
  - Text: `text-outline` (`#86948a`), `cursor-not-allowed`
  - Border: `border border-outline-variant/60`

### Secondary / Ghost Buttons (e.g. "Edit", "New Recipe", "Save", "Share")
- Background: `bg-surface-container` (`#1c2026`)
- Hover: `hover:bg-surface-container-high` (`#262a31`)
- Text: `text-on-surface` (`#dfe2eb`), font `label-md`
- Radius: `rounded-lg` (`8px`)
- Dimensions: `h-9 px-3.5` (compact) or `h-10 px-3` (standard)

### Stepper Buttons (`-` / `+`)
- Minimum touch target: `min-w-[44px] min-h-[44px] w-11 h-11`
- Background: `bg-surface-container-highest` (`#31353c`)
- Hover: `hover:bg-surface-bright` (`#353940`)
- Text: `text-on-surface` (`#dfe2eb`), font `headline-sm`
- Active: `active:scale-95`
- Radius: `rounded-lg`

### Reset Button
- Compact action: `h-7 px-2.5 rounded bg-surface-container hover:bg-surface-container-highest text-outline hover:text-on-surface font-label-sm`
- Icon: `refresh` (`14px`)

### Swap Action Button
- Inactive: `min-h-[44px] h-11 w-full bg-surface-container-high hover:bg-surface-bright text-on-surface rounded-lg px-3 flex items-center justify-center gap-2 font-label-md`
- Copied: `bg-primary-container text-on-primary-container cursor-default font-semibold`

---

## 6. Form Elements & Input Fields

### Natural Language Ingredient Textarea
- Container: Inset panel inside `bg-surface-container` card with `border-outline-variant/60`.
- Textarea Element:
  - Background: `bg-surface-container-lowest` (`#0a0e14`)
  - Border: `border border-outline-variant` (`#86948a`)
  - Radius: `rounded-lg` (`8px`)
  - Padding: `p-4` (`16px`)
  - Text: `font-body-lg text-body-lg text-on-surface`
  - Placeholder: `text-outline` (`"List your ingredients, e.g: 2 eggs, flour, butter, milk, sugar, half an onion..."`)
  - Minimum Height: `min-h-[140px]`
  - Focus State: `focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/30`
  - Shadow: `shadow-inner`
  - Resize: `resize-none`
- Bottom Toolbar:
  - Helper note with `info` icon: `"Separate ingredients with commas or natural lines"`
  - Live character count: `font-mono text-outline font-label-sm` (`0 / 400`)

### Quick-Add Ingredient Chips
- Layout: Horizontal wrap below the main input card (`flex flex-wrap gap-2 justify-center`).
- Element:
  - Background: `bg-surface-container-high` (`#262a31`)
  - Hover: `hover:bg-surface-container-highest`, `hover:border-primary-container`
  - Border: `border border-outline-variant`
  - Radius: `rounded-full`
  - Padding: `px-3.5 py-1.5`
  - Text: `text-on-surface font-label-md`
  - Leading Icon: `+` in `text-primary font-bold`
- Behavior: Clicking appends item to textarea, automatically managing comma separation.

---

## 7. Cards & Surface Elevation

- **Base Card Structure**:
  - Background: `bg-surface-container-low` (`#181c22`) or `bg-surface-container` (`#1c2026`)
  - Radius: `rounded-xl` (`12px`)
  - Padding: `p-4` to `p-6`
  - Border: `border border-outline-variant/40` or `/60`
  - Shadow: `shadow-sm` or `shadow-md`
- **Feature Value Proposition Cards**:
  - 3-column grid (`grid-cols-1 md:grid-cols-3 gap-4`)
  - Icon block: `w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shadow-sm`
  - Color pairings: Emerald (`eco`), Teal (`tune`), Amber (`published_with_changes`)
  - Action footer link with `arrow_forward`

---

## 8. Page Layout & Breakpoint Behavior

### Global Header
- Position: `fixed top-0 left-0 right-0 z-50`
- Height: `h-16` (`64px`)
- Background: `bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/60`
- Inner: Centered `max-w-[800px] px-4 sm:px-6 flex items-center justify-between`
- Left: Logo icon + "FridgeAI" title + "Gemini Powered" badge with pulsing emerald dot (`animate-pulse`).
- Right: Navigation links (`Recipes`, `Pantry`) + user profile avatar circle.

### Desktop Layout (`md:` breakpoint ≥ 768px)
- Recipe Main Content: 12-column CSS Grid (`grid-cols-1 md:grid-cols-12 gap-6 items-start`):
  - Left column: `md:col-span-5` for Ingredients Card.
  - Right column: `md:col-span-7` for Cooking Steps Card.
- Ingredient Swaps: 3-column grid (`grid-cols-1 sm:grid-cols-3 gap-4`).
- Cooking Tips: 2-column grid (`grid-cols-1 sm:grid-cols-2 gap-4`).
- Top ingredient recap bar: Horizontal inline layout with edit & action buttons right-aligned.

### Mobile Breakpoint Behavior (< 768px)
- Stacking: All multi-column grids collapse to a single vertical column (`flex flex-col` or `grid-cols-1`).
- Padding: `px-4` gutter spacing with zero horizontal overflow (`overscroll-behavior: none`).
- Touch Targets: Interactive controls (stepper buttons, checkboxes, copy buttons) strictly observe `min-w-[44px] min-h-[44px]`.
- Top recap banner & metadata stats wrap cleanly into vertical or flex-wrap stacks.

---

## 9. Recipe View Specifications

### 1. Ingredient Recap Top Bar
- Container: `bg-surface-container-low rounded-xl px-4 py-3 flex items-center justify-between gap-4 mb-6`
- Left: Kitchen icon in square badge + "USED INGREDIENTS:" tag + comma-delimited text truncate.
- Right: `Edit` button + `New Recipe` button (`bg-primary-container font-semibold`).

### 2. Recipe Header & Metadata
- Verified Badge: `inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-label-sm mb-3`
- Recipe Title: `font-headline-lg text-headline-lg text-[#F0FDF4] tracking-tight`
- Description: `font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-6`
- Metadata Bar:
  - Prep Time: Schedule icon (`text-primary`), uppercase "PREP" label, value (e.g. `10 mins`)
  - Divider: Vertical divider line `w-px h-8 bg-surface-container-highest hidden sm:block`
  - Cook Time: Fire icon (`text-tertiary`), uppercase "COOK" label, value (e.g. `20 mins`)
  - Divider: Vertical divider line
  - Base Formula: Group icon (`text-secondary`), uppercase "FORMULA" label, value (`2 servings base`)
  - Servings Stepper: Compact embedded control in `bg-surface-container px-3 py-1.5 rounded-lg`.

### 3. Servings Control UI
- Label: Uppercase `SERVINGS` in `text-outline font-label-sm` + subtitle `scaled from [base]`.
- Decrement Button: `w-11 h-11 rounded-lg bg-surface-container-highest text-on-surface flex items-center justify-center font-headline-sm`
- Counter Display: `w-7 text-center font-headline-md text-headline-md text-[#F0FDF4]`
- Increment Button: `w-11 h-11 rounded-lg bg-surface-container-highest text-on-surface flex items-center justify-center font-headline-sm`

### 4. Ingredients UI (`md:col-span-5`)
- Header:
  - Title: `Ingredients for X servings` (`font-headline-sm text-on-surface`)
  - Subtitle: `Freshly scaled measurements` (`font-label-sm text-outline`)
  - Scaling Pill: `px-2 py-0.5 rounded-full bg-primary-container/15 text-primary font-label-sm font-semibold` (`Scaled x2`)
- List Items:
  - Separators: `divide-y divide-surface-container-highest`
  - Item row: `py-3 flex items-center justify-between gap-3`
  - Left: Ingredient name in `font-body-md text-on-surface font-medium` + strikethrough base amount below in `font-body-sm text-outline line-through`
  - Right: Scaled quantity in `font-body-lg text-body-lg font-bold text-primary`
- Footer Info: Rounded banner with info icon: `"Pantry proportions automatically rounded for standard kitchen scoops."`

### 5. Cooking Steps UI (`md:col-span-7`)
- Header: `"Cooking Steps"` title + `Reset` button (`refresh` icon).
- Progress Tracker:
  - Label: `X of Y steps complete` (`font-label-md font-semibold text-[#F0FDF4]`)
  - Percentage: `font-label-sm text-primary font-bold` (`50%`)
  - Track: `w-full bg-surface-container-highest h-2 rounded-full overflow-hidden`
  - Fill: `bg-primary-container h-full transition-all duration-300 rounded-full`
- Step Card Variants:
  - **Completed Step**:
    - Background: `bg-surface-container/60`
    - Checkbox: Circular `w-6 h-6 rounded-full bg-primary-container text-on-primary-container` with `check` icon.
    - Text: `step-text text-outline line-through`
  - **Active / Current Step**:
    - Background: `bg-surface-container-high shadow-md relative overflow-hidden`
    - Left Accent Bar: `absolute left-0 top-0 bottom-0 w-1.5 bg-primary-container`
    - Step Badge: Circular `w-6 h-6 rounded-full bg-surface-container text-primary font-bold` with step index (e.g. `04`)
    - Header Tag: `STEP 04 • CURRENT` (`text-primary font-bold`) + timing badge (`bg-primary-container/20 text-primary font-semibold`)
    - Text: `font-body-md text-on-surface font-semibold`
  - **Upcoming / Unchecked Step**:
    - Background: `bg-surface-container/40`
    - Step Badge: Circular `w-6 h-6 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm`
    - Header Tag: `STEP 05` (`text-outline font-bold`) + timing badge (`bg-surface-container-highest text-outline`)
    - Text: `font-body-md text-on-surface`

### 6. Ingredient Swaps UI
- Header: `swap_horiz` icon (`text-primary`), "Ingredient Swaps" title, subtitle "Pantry-friendly alternatives suggested by Gemini", and count badge (`3 swaps available`).
- Swap Cards:
  - Container: `bg-surface-container p-4 rounded-lg flex flex-col justify-between gap-3`
  - Swap Pair: `Ingredient A` + `⇄` (`text-primary font-bold`) + `Ingredient B` in `font-label-lg font-semibold text-[#F0FDF4]`
  - Swap Description: `font-body-sm text-on-surface-variant leading-relaxed`
  - Button: "Copy swap" with `content_copy` icon, transitions to "Copied!" with `check` icon.

### 7. Cooking Tips UI
- Header: `lightbulb` icon (`text-tertiary`), "Cooking Tips" title.
- Tip Cards:
  - Container: `bg-surface-container p-4 rounded-xl flex items-start gap-3 shadow-sm`
  - Icon Badge: `w-8 h-8 rounded-full` circular container with theme color (`water_drop` in amber, `skillet` in emerald).
  - Content: Bold lead phrase (`<strong class="text-on-surface font-semibold">`) followed by explanatory text in `text-on-surface-variant`.

---

## 10. Loading State UI

- Position: Contained inside an elevated central card (`bg-surface-container rounded-xl p-8 sm:p-10 shadow-xl border border-outline-variant/60 relative overflow-hidden`).
- Top Accent: `h-1 bg-surface-container-highest` with `bg-primary animate-pulse w-full`.
- Ambient Glow: Radial backdrop `w-72 h-36 bg-primary/10 rounded-full blur-2xl`.
- **Dual Rotating SVG Spinner**:
  - Outer Glow: `absolute inset-0 rounded-full bg-primary/15 blur-md animate-pulse`
  - Outer Ring: SVG `w-16 h-16 animate-spin text-primary stroke-[3.5px]`
  - Inner Ring: SVG `w-9 h-9 [animation:spin_2s_linear_infinite_reverse] text-secondary stroke-[2.5px]`
  - Center Icon: Material Symbol `auto_awesome` (`text-primary text-[18px]`)
- Heading: `"Generating your recipe..."` (`font-headline-md text-on-surface`)
- Subtitle: `"Gemini is checking your fridge and synthesizing macro-balanced combinations..."`
- **Live AI Thinking Steps Timeline**:
  1. *Step 1 (Completed)*: Checkmark icon in `bg-primary/15`, `"Parsed pantry items"` + `"Complete"` label.
  2. *Step 2 (Active)*: Ping dot in `bg-primary-container`, `"Finding optimal flavor profiles & cook times"` + `"Computing"` pulsing label + mini progress bar.
  3. *Step 3 (Queued)*: Inactive dot in `bg-surface-container-highest`, `"Structuring step-by-step guide & ingredient swaps"` + `"Queued"` label.
- Telemetry Footer: `Model: Gemini 1.5 Pro` with `memory` icon.

---

## 11. Error State UI

- Retained Input Area: Preserves the user's entered ingredients list at the top with chip tokens and an auto-saved badge so input is never lost.
- Error Alert Card:
  - Container: `bg-surface-container-high rounded-xl p-8 text-center my-6 shadow-xl relative overflow-hidden`
  - Backdrop Glow: `w-48 h-48 bg-error/10 blur-3xl rounded-full`
  - Icon: Circular `w-14 h-14 rounded-full bg-error-container/30 text-error flex items-center justify-center` with `error` icon.
  - Heading: `"Couldn’t generate recipe"` (`font-headline-md text-on-surface font-bold`)
  - Friendly Error Message Mapping:
    - `"NETWORK_ERROR"` → `"Could not reach the server. Check your connection or verify that your ingredients list contains recognizable food items."`
    - `"MALFORMED_JSON"` → `"The AI returned an unexpected format. Try again."`
    - `"WRONG_SHAPE"` → `"The AI response was incomplete. Try again."`
    - `"SERVER_ERROR"` → `"Server error. Try again in a moment."`
  - **Diagnostic Telemetry Stepper**:
    - Label: `"Request Flow"` + `"Stage 3 Failed"` in `text-error font-medium`
    - 3 Segmented Bars:
      1. Pantry Parsed (`bg-primary-container`)
      2. Filter Applied (`bg-primary-container`)
      3. Model Response (`bg-error animate-pulse`)
  - Action Buttons:
    - Primary CTA: `"Try Again"` button (`h-11 px-7 rounded-lg bg-primary-container text-on-primary-container font-bold flex items-center justify-center gap-2 min-w-[200px]`)
    - Secondary CTA: `"Edit Ingredients"` button (`min-h-[44px] text-on-surface-variant hover:text-on-surface hover:underline font-label-md`)
- **Connection Advisory Box**:
  - Container: `mt-6 pt-5 bg-surface-container-low rounded-lg p-3.5 flex items-start gap-3 text-left`
  - Icon: `lightbulb` (`text-tertiary`)
  - Tag: `"CONNECTION ADVISORY"` in `font-label-sm text-tertiary font-bold tracking-wide uppercase`
  - Body: `"Tip: Make sure you're connected to the internet. Gemini API requests may momentarily time out during peak server load or unstable network handshakes."`
- **Fallback Inspiration Grid: Offline Quick-Picks**:
  - Header: `offline_bolt` icon (`text-secondary`), Title: `"Offline Quick-Picks"`, Subtitle: `"Cached from your pantry"`
  - Layout: Responsive 2-column grid (`grid-cols-1 sm:grid-cols-2 gap-4`)
  - Cards:
    - Card 1: `Garlic Cheddar Pan Omelette` with food thumbnail, `"Matches 5 of 7 ingredients"` (emerald badge), `"Ready in 10 mins • High Protein"`, `"Instant Prep"` tag.
    - Card 2: `Quick Cheddar Drop Biscuits` with food thumbnail, `"Matches 4 of 7 ingredients"` (amber badge), `"Bake 18 mins • Comfort Bakery"`, `"Pantry Classic"` tag.
    - Behavior: Fully interactive — clicking any offline quick-pick card immediately loads the cached recipe into the full recipe view so cooking is uninterrupted even when offline.
