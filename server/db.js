const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.MONGODB_URI)
const dbName = 'meal-prep-assistant'

async function connectDB() {
    try {
        await client.connect()
        console.log('Connected to mangoDB')
        const db = client.db(dbName)
        return db;
    } catch (error) {
        console.error('Connection error:', error.message)
        throw error
    }
    
}

module.exports = {connectDB};