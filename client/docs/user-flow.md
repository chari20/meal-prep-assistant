# User Flow — Meal Prep Assistant

## Overview
This document outlines the full user journey through the Meal Prep Assistant application. It covers the first-time onboarding experience, AI meal plan generation, the returning user experience, and all five core views of the app.

---

## App Views

| View | Purpose |
|---|---|
| **Onboarding** | First-time setup — cuisines, goals, preferences |
| **Profile** | Returning user home — preferences and current plan |
| **Meal Plan** | Weekly view — all meals organized by day |
| **Meal Detail** | Cooking instructions, mark as done, rate the meal |
| **Grocery List** | Categorized shopping list with checkable items |

---

## Phase 1 — First Time User

The first time a user opens the app they are taken through a four step onboarding flow before any meal plan is generated.

```
🚀 USER OPENS APP FOR THE FIRST TIME
        │
        ▼
┌─────────────────────────────────┐
│         ONBOARDING FLOW         │
│                                 │
│  Step 1: Pick Cuisine Types     │
│  American · Mexican · Asian     │
│  Mediterranean · Italian · etc  │
│                                 │
│  Step 2: Dislikes & Allergies   │
│  Ingredients to always avoid    │
│                                 │
│  Step 3: Meal Prep Style        │
│  How many days · Which meals    │
│  Snacks · Prep time preference  │
│                                 │
│  Step 4: Fitness Goals          │
│  Weight · Height · Calories     │
│  Protein · Carbs · Fiber        │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│         AI GENERATION           │
│                                 │
│  Claude builds personalized     │
│  meal plan based on:            │
│  · Cuisine preferences          │
│  · Fitness goals                │
│  · Meal prep style              │
│  · Available ingredients        │
│                                 │
│  Output includes:               │
│  · Meals with macros            │
│  · Prep and cook time           │
│  · Step by step instructions    │
│  · Categorized grocery list     │
└──────────────┬──────────────────┘
               │
               ▼
        ◆ Like the plan? ◆
         /               \
       NO                YES
        │                 │
        ▼                 ▼
  Tweak preferences   ┌──────────────────────┐
  Go back to          │    MEAL PLAN VIEW     │
  Step 1 or 2         │                       │
                      │  📅 Weekly meal plan  │
                      │  organized by day     │
                      │                       │
                      │  🛒 Grocery list      │
                      │  by category          │
                      │                       │
                      │  👨‍🍳 Prep guide        │
                      │  with instructions    │
                      └──────────┬────────────┘
                                 │
                                 ▼
                      ✅ USER IS READY TO MEAL PREP
```

---

## Phase 2 — Returning User

When a user who has already completed onboarding opens the app they land on their Profile view — not the onboarding flow.

```
🔄 RETURNING USER OPENS APP
        │
        ▼
┌─────────────────────────────────┐
│           PROFILE VIEW          │
│                                 │
│  👤 Hey, [Name]!                │
│                                 │
│  YOUR PREFERENCES               │
│  🥩 High Protein                │
│  🥗 Low Carb                    │
│  🌱 Vegetarian                  │
│                                 │
│  THIS WEEK'S PLAN               │
│  ┌─────────────────────────┐    │
│  │  Week of June 14        │    │
│  │  5 days · 3 meals/day   │    │
│  │  → View Plan            │    │
│  └─────────────────────────┘    │
│                                 │
│  [ + Create New Meal Plan ]     │
└──────────────┬──────────────────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
 View Current      Create New
 Meal Plan         Meal Plan
       │                │
       ▼                ▼
  MEAL PLAN        Back to AI
  VIEW             Generation
```

---

## Phase 3 — Using The Meal Plan

Once a user has their meal plan they can drill into each meal for details and track their progress through the week.

```
MEAL PLAN VIEW
│
│  Shows all meals organized by day
│  Monday · Tuesday · Wednesday...
│
└──► Click on a meal
            │
            ▼
   ┌─────────────────────────────────┐
   │         MEAL DETAIL VIEW        │
   │                                 │
   │  🍽 Greek Yogurt Parfait        │
   │                                 │
   │  MACROS                         │
   │  320 cal · 22g protein          │
   │  40g carbs · 3g fiber           │
   │                                 │
   │  PREP & COOK TIME               │
   │  Prep: 5 mins · Cook: 0 mins    │
   │                                 │
   │  INSTRUCTIONS                   │
   │  1. Layer yogurt in a bowl      │
   │  2. Add granola on top          │
   │  3. Add blueberries             │
   │                                 │
   │  [ ✅ Mark as Done ]            │
   │                                 │
   │  HOW WAS THIS MEAL?             │
   │  ⭐ ⭐ ⭐ ⭐ ⭐               │
   └──────────────┬──────────────────┘
                  │
         ┌────────┴─────────┐
         │                  │
         ▼                  ▼
    Rated 4-5 ⭐       Rated 1-3 ⭐
         │                  │
         ▼                  ▼
   Saved to            Saved to
   most_preferred      disliked_meals
   _meals              │
         │             │
         └──────┬───────┘
                │
                ▼
        Feedback loop updates
        user preference profile
                │
                ▼
        Next meal plan is
        more personalized
```

---

## Phase 4 — Grocery List

The grocery list is auto-generated from the meal plan and lives in its own dedicated tab.

```
GROCERY LIST VIEW
│
│  Organized by category
│  for easy navigation at the store
│
├── 🥩 Meats
│   ☐ Chicken breast
│   ☐ Ground turkey
│
├── 🥛 Dairy
│   ☐ Greek yogurt
│   ☐ Eggs
│
├── 🥦 Produce
│   ☐ Broccoli
│   ☐ Blueberries
│   ☐ Spinach
│
├── 🌾 Grains
│   ☐ Rice
│   ☐ Granola
│
└── 🫙 Pantry
    ☐ Teriyaki sauce
    ☐ Olive oil

Items already in available_ingredients
are automatically removed from this list.
```

---

## Full App Navigation

```
┌─────────────────────────────────────────┐
│              BOTTOM NAV                 │
│                                         │
│  👤 Profile  📅 Meal Plan  🛒 Grocery  │
└─────────────────────────────────────────┘
```

---

## Related Documents

- [`docs/data-model.md`](./data-model.md) — Full data structure and MongoDB schema