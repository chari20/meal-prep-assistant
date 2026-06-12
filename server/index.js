const express = require('express');
const cors = require('cors')
require('dotenv').config();
const Anthropic = require('@anthropic-ai/sdk');

const app = express();

app.use(cors());
app.use(express.json());

const client = new Anthropic();

app.get('/', (req, res) => {
    res.json({message: 'Meal Prep Assistant API is running'})
})


app.post('/api/meal-plan', async (req, res) => {
    const { calories, protein, preferences, dislikes, ingredients } = req.body;

    const prompt = `You are a helpful nutrition and meal prep assistant.

The user has the following goals and preferences:
- Daily calorie goal: ${calories} calories
- Daily protein goal: ${protein}g
- Food preferences: ${preferences}
- Dislikes / allergies: ${dislikes}
- Available ingredients: ${ingredients}

Please generate a practical one-day meal prep plan that includes:
1. Breakfast, lunch, dinner, and one snack
2. Estimated calories and protein for each meal
3. Simple prep instructions for each meal
4. A brief grocery list for anything not already in their available ingredients

Keep it realistic, healthy, and easy to prepare.`;

    try {
    const message = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
    });

    const mealPlan = message.content[0].text;
    res.json({ mealPlan });
    } catch (error) {
    console.error('Claude API error:', error);
    res.status(500).json({ mealPlan: 'Error generating meal plan. Please try again.' });
    }
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => [
    console.log(`Server running on port ${PORT}`)
])