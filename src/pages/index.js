import React, { useState } from "react"
import * as styles from "../components/index.module.css"
import { useInterval } from "../utils/interval"

const IndexPage = () => {
  const [file, setFile] = useState()
  const [uploadedImg, setUploadedImg] = useState()
  const [moderatedImage, setModeratedImage] = useState()
  const [timer, setTimer] = useState(60000)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const submitForm = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", file)
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const image = await response.json()
      setIsLoading(true)
      setUploadedImg(image)
      setFile(null)
    } catch (err) {
      console.log(err)
    }
  }

  const handleFileInputChange = e => {
    setFile(e.target.files[0])
  }

  const getModeratedPhoto = async () => {
    try {
      if (uploadedImg) {
        const response = await fetch("/api/poll", {
          method: "POST",
          body: JSON.stringify({
            asset_id: uploadedImg.asset_id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        const answer = await response.json()
        console.log(answer)
        if (answer.status === "approved" || answer.status === "rejected") {
          setTimer(null)
        }
        if (answer.status === "approved") {
          setIsLoading(false)
          setModeratedImage(answer)
        } else if (answer.status === "rejected") {
          setIsError(true)
          setIsLoading(false)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  useInterval(() => {
    getModeratedPhoto()
  }, timer)

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        Content Moderation with Gatsby Functions & Cloudinary
      </h1>
      <div className={styles.container}>
        <form
          onSubmit={submitForm}
          action="/api/upload"
          encType="multipart/form-data"
          method="POST"
        >
          <div className={styles.formContainer}>
            {file && <p>{file.name}</p>}
            <label className={styles.inputLabel} htmlFor="file">
              Choose a file to upload
            </label>
            <input
              onChange={handleFileInputChange}
              type="file"
              name="file"
              id="file"
            />
            <button type="submit">Upload Photo</button>
          </div>
        </form>
        <div className={styles.imageWrapper}>
          <div className={styles.messages}>
            {!uploadedImg && <p>Moderated Image goes in here</p>}

            {isError && (
              <p className={styles.error}>
                Image has been flagged for inappropriate content
              </p>
            )}
            {isLoading && (
              <p className={styles.upload}>
                Image has been uploaded and is pending moderation...
              </p>
            )}

            {moderatedImage && (
              <img src={moderatedImage.url} alt="moderated content" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
