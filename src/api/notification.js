const { MongoClient } = require("mongodb");


export default async function handler(req, res) {
    try {
        const uri =
            process.env.MONGODB_URI;

        const client = new MongoClient(uri);
        try {
            const database = client.db("cloudinary");
            const collection = database.collection('moderated_images');
            const moderatedImage = req.body
            const result = await collection.insertOne(moderatedImage);
            console.log(result.insertedId);
        } finally {
            await client.close();
        }
        res.json({ msg: "Success" });
    }
    catch (err) {
        res.status(500).json({ msg: err.message })
    }
}