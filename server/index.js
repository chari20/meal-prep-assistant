const express = require('express');
const cors = require('cors')
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: 'Meal Prep Assistant API is running'})
})


app.post('/api/meal-plan', (req, res) => {

    const { calories, protein, preferences, dislikes, ingredients } = req.body;

    console.log('Received:', req.body);

    res.json({
    mealPlan: `Got your request! Calories: ${calories}, Protein: ${protein}g. AI response coming soon.`
});
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => [
    console.log(`Server running on port ${PORT}`)
])