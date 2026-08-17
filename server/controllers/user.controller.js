async function saveUserInformation(req, res) {
  try {
    const db = req.app.locals.db;
    const userCollection = db.collection('users');

    // destructure everything from req.body
    const {
      user_name,
      preferred_cuisine,
      disliked_ingredients,
      meal_prep_style,
      body_metrics,
      fitness_goal,
    } = req.body;

    // validate — what is the minimum required field?
    if (!user_name || !user_name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // build the document — match your data model
    const doc = {
      user: {
        name: user_name,
      },
      preferences: {
        loves: preferred_cuisine,
        dislikes: disliked_ingredients,
      },
      meal_prep_style: { ...meal_prep_style },
      body_metrics: {
        ...body_metrics,
      },
      fitness_goal: { ...fitness_goal },
      most_preferred_meals: [],
      disliked_meals: [],
      current_meal_plan: null,
      created_at: new Date(),
    };

    const result = await userCollection.insertOne(doc);
    return res.status(201).json(result);
  } catch (error) {
    console.error('Error saving user:', error.message);
    return res.status(500).json({ error: 'Failed to save user' });
  }
}

module.exports = { saveUserInformation };
