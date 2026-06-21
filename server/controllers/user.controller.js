

async function saveUserInformation(req, res) {
    try {
        // get db from apps.locals
        const db = req.app.locals.db
        const userCollection = db.collection('users');

        const { name } = req.body;
        if (!name || name.trim()) {
            return res.status(400).json({
                error: 'Name is required'
            })
        }
        const doc = { user: { name: name.trim() } }
        const result = await userCollection.insertOne(doc)
    
        return res.status(201).json(result)
    } catch(error) {
        console.error('Error saving user:', error.message)
        return res.status(500).json({error: 'Failed to save User'})
    }
};

module.exports = {saveUserInformation}
