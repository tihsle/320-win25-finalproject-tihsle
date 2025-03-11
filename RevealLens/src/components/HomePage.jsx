import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function HomePage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (ev) => {
        setPreview(ev.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = () => {
    if (selectedFile && preview) {
      // to the analysis page
      navigate('/analysis', { state: { file: selectedFile, image: preview } })
    }
  }

  return (
    <div className="app-container">
      <header>
        <img src="/logo.png" alt="RevealLens Logo" />
        <h1>RevealLens</h1>
      </header>
      <div className="container">
        <h2>Upload Your Image</h2>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <div className="preview">
            <img src={preview} alt="Preview" style={{ maxWidth: '300px' }} />
            <button onClick={handleUpload}>Analyze Image</button>
          </div>
        )}
      </div>
    </div>
  )
}

HomePage.propTypes = {}

export default HomePage