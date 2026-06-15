 # Data Model — Meal Prep Assistant

## Overview
This document outlines how data is structured and stored for the Meal Prep Assistant application. It covers the user profile, meal preferences, meal plan structure, grocery list, and the AI feedback loop that improves recommendations over time.

---

## Database

**MongoDB** is used as the database for this application.

**Why MongoDB:**
- Data is JSON-based and heavily nested
- User profiles, meal plans, and preferences are stored as a single document per user
- Flexible schema allows the data model to evolve as features are added
- No complex joins needed — all related data lives together

---

## Feedback Loop

The feedback loop is the core mechanism that makes meal recommendations smarter over time. Every meal rating a user submits improves their next meal plan.

```
User rates meal 5 stars
        │
        ▼
Meal saved to most_preferred_meals
        │
        ▼
Profile passed to Claude on next request
        │
        ▼
Claude generates similar meals user will enjoy
        │
        ▼
Grocery list auto-generated from new plan
        │
        ▼
User shops with categorized grocery list
```

> Meals rated 3 stars or lower are saved to `disliked_meals` and recommended less frequently.

---

## Data Model

Each user is stored as a single document in MongoDB. Below is the full structure with field descriptions.

### User Profile

```json
{
  "user": {
    "name": "string",

    // Supports metric and imperial — important for international users
    "unit_of_measurement": {
      "weight": "pounds | grams",
      "liquid": "oz | ml"
    },

    // Daily nutrition targets used to evaluate generated meal plans
    "goals": {
      "calories": 2000,
      "protein": 150,
      "fiber": 28,
      "carbs": 30
    },

    // Set during onboarding — used in every Claude prompt
    "preferences": {
      "loves": ["Asian cuisine", "Easy prep", "High protein"],
      "dislikes": ["Mexican cuisine", "Shellfish"]
    },

    // Controls how Claude structures the generated meal plan
    "meal_prep_style": {
      "prep_time": "under 20 minutes | elaborate",
      "days": 5,
      "meals_per_day": {
        "breakfast": true,
        "lunch": true,
        "dinner": true,
        "snacks": {
          "enabled": true,
          "amount": 2
        }
      }
    },

    // What the user already has at home — used to reduce grocery list
    "available_ingredients": [
      "chicken breast",
      "rice",
      "broccoli"
    ],

    // Meals rated 5 stars — passed to Claude to generate similar meals
    "most_preferred_meals": [
      {
        "name": "Chicken Teriyaki Bowl",
        "cuisine": "Asian",
        "rating": 5,
        "prep_time": 20,
        "macros": {
          "calories": 420,
          "protein": 35,
          "carbs": 38,
          "fiber": 4
        }
      }
    ],

    // Meals rated 3 stars or lower — Claude recommends these less often
    "disliked_meals": [
      {
        "name": "Spicy Shrimp Tacos",
        "cuisine": "Mexican",
        "rating": 2,
        "reason": "too spicy"
      }
    ],

    // The active meal plan for the current week
    "current_meal_plan": {
      "week_of": "2026-06-14",

      // One entry per day — each day contains all meals for that day
      "days": [
        {
          "day": "Monday",
          "meals": [
            {
              "type": "breakfast",
              "name": "Greek Yogurt Parfait",
              "prep_time": 5,
              "cook_time": 0,
              "ingredients": [
                "greek yogurt",
                "granola",
                "blueberries"
              ],
              "macros": {
                "calories": 320,
                "protein": 22,
                "carbs": 40,
                "fiber": 3
              },
              "instructions": [
                "Layer yogurt in a bowl",
                "Add granola on top",
                "Add blueberries"
              ],
              // Tracks whether the user has cooked this meal
              "completed": false,
              // Populated when user rates the meal — drives feedback loop
              "rating": null
            }
          ]
        }
      ],

      // Auto-generated from meal plan — organized by category for easy shopping
      "grocery_list": {
        "produce": ["broccoli", "blueberries"],
        "meats": ["chicken breast"],
        "dairy": ["greek yogurt"],
        "grains": ["rice", "granola"],
        "pantry": ["teriyaki sauce", "olive oil"]
      }
    }
  }
}
```

---

## Key Field Reference

| Field | Type | Purpose |
|---|---|---|
| `unit_of_measurement` | Object | Supports metric and imperial units |
| `goals` | Object | Daily nutrition targets for meal plan evaluation |
| `preferences` | Object | Cuisine loves and dislikes set during onboarding |
| `meal_prep_style` | Object | Controls days, meals per day, and prep time |
| `available_ingredients` | Array | Reduces unnecessary grocery list items |
| `most_preferred_meals` | Array | 5 star meals passed to Claude for better recommendations |
| `disliked_meals` | Array | Low rated meals Claude avoids recommending |
| `current_meal_plan` | Object | Active weekly plan with meals, macros, and instructions |
| `grocery_list` | Object | Auto-generated and categorized for easy shopping |
| `completed` | Boolean | Tracks whether a meal has been cooked |
| `rating` | Number or null | Populated after user rates a meal — drives feedback loop |

---

## Related Documents

- [`docs/user-flow.md`](./user-flow.md) — Onboarding and app user journey