const { MongoClient } = require("mongodb")
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)
const database = client.db("cloudinary")
export const collection = database.collection("moderated_images")
