//first require all dependencies
require("dotenv").config()
const cloudinary = require("cloudinary").v2
let streamifier = require("streamifier")
//Here we'll configure the cloudinary API
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
export default async function handler(req, res) {
  try {
    //Here we'll check if a file was sent to the API and then proceed to upload
    if (req.files) {
      let cld_upload_stream = cloudinary.uploader.upload_stream(
        {
          //This is the cloudinary upload preset we created
          folder: "moderated-content",
          //Here we specify the moderation plugin we want to use
          moderation: "webpurify",
          notification_url: process.env.NOTIFICATION_URL,
        },
        function (error, result) {
          // We then return the result of the file uploaded once done successfully
          res.json({
            asset_id: result.asset_id,
            url: result.secure_url,
            moderation: result.moderation,
          })
        }
      )
      streamifier.createReadStream(req.files[0].buffer).pipe(cld_upload_stream)
    }
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
}
