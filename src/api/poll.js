import { collection } from "../utils/mongodb"

export default async function handler(req, res) {
    try {
        //search for the moderated image in the database
        const moderatedImage = await collection.findOne({ asset_id: req.body.asset_id, notification_type: "moderation" })
        //if the image is found, return the image
        if (moderatedImage && moderatedImage.moderation_status === "approved") {
            res.json({ msg: "Image has passed the moderation filter", status: "approved", url: moderatedImage.url })
        } else if (moderatedImage && moderatedImage.moderation_status === "rejected") {
            res.json({ msg: "Image has been flagged for inappropriate content", status: "rejected" })
        }
        else {
            res.json({ msg: "Image is still pending moderation..." })
        }
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}