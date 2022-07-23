import * as React from "react"
import * as styles from "../components/index.module.css"

const IndexPage = () => {
  const [file, setFile] = React.useState()

  const submitForm = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", file)
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      //set file to null if successful
      setFile(null)
    } catch (err) {
      console.log(err)
    }
  }
  const handleFileInputChange = e => {
    setFile(e.target.files[0])
  }

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
          <div>
            <p>Moderated Image goes in here</p>
            <img src="" alt="Hello world" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
