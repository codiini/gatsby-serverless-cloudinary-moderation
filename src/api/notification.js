//Import collection from mongodb connection
import { collection } from "../utils/mongodb"
export default async function handler(req, res) {
  try {
    //Here we'll receive the notification from cloudinary about the status
    // of our image moderation and then update the database
    const moderatedImage = req.body
    await collection.insertOne(moderatedImage)
    res.json({ msg: "Success" })
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
}
