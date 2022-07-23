const { MongoClient } = require("mongodb")
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)
const database = client.db("cloudinary")
const collection = database.collection("moderated_images")

export default async function handler(req, res) {
  try {
    const moderatedImage = req.body
    const result = await collection.insertOne(moderatedImage)
    console.log(result.insertedId)
    res.json({ msg: "Success" })
  } catch (err) {
    res.status(500).json({ msg: err.message })
  } finally {
    await client.close()
  }
}
