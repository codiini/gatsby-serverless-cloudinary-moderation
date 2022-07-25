const { MongoClient } = require("mongodb")
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)
//we're connecting to our database named "cloudinary"
const database = client.db("cloudinary")
//Here we export our database collection after connecting to mongodb
export const collection = database.collection("moderated_images")
