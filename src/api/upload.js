require("dotenv").config()
const cloudinary = require("cloudinary").v2
let streamifier = require("streamifier")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default async function handler(req, res) {
    try {
        if (req.files) {
            let cld_upload_stream = cloudinary.uploader.upload_stream(
                {
                    folder: "moderated-content",
                    notification_url: "https://example.com/notify_endpoint",
                    // moderation: "webpurify",
                },
                function (error, result) {
                    console.log(error, result)
                    res.json({ public_id: result.public_id, url: result.secure_url });
                }
            )
            streamifier.createReadStream(req.files[0].buffer).pipe(cld_upload_stream)
        }
    }
    catch (err) {
        res.status(500).json({ msg: err.message })
    }
}