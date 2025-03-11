import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import EXIF from 'exif-js'

function AnalysisPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { file, image } = location.state || {}

  const [metadata, setMetadata] = useState(null)

  useEffect(() => {
    if (!file) {
      navigate('/')
      return
    }

    // Create an image 
    const img = new Image()
    img.onload = function () {
      // extract EXIF data
      EXIF.getData(img, function () {
        const gpsLatitude = EXIF.getTag(this, 'GPSLatitude')
        const gpsLongitude = EXIF.getTag(this, 'GPSLongitude')
        setMetadata({
          fileType: file.type,
          fileSize: file.size,
          gpsLatitude: gpsLatitude ? gpsLatitude.join(', ') : 'Not available',
          gpsLongitude: gpsLongitude ? gpsLongitude.join(', ') : 'Not available'
        })
      })
    }

    img.onerror = function () {
      console.error('Error loading image for EXIF extraction')
      setMetadata({
        fileType: file.type,
        fileSize: file.size,
        gpsLatitude: 'Not available',
        gpsLongitude: 'Not available'
      })
    }

    // object URL from the file.
    const objectUrl = URL.createObjectURL(file)
    img.src = objectUrl

    // Cleanup
    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [file, navigate])

  // Simulated AI analysis using static label data.
  const aiAnalysis = {
    labels: [
      { description: 'Cityscape', score: 0.95 },
      { description: 'Urban', score: 0.90 },
      { description: 'Architecture', score: 0.85 }
    ]
  }

  if (!image) {
    return null
  }

  return (
    <div className="app-container">
      <header>
        <img src="/logo.png" alt="RevealLens Logo" />
        <h1>RevealLens</h1>
      </header>
      <div className="container">
        <h2>Image Analysis</h2>
        <img src={image} alt="Analyzed" style={{ maxWidth: '300px' }} />
        <h3>Metadata</h3>
        {metadata ? (
          <div>
            <p>Type: {metadata.fileType}</p>
            <p>Size: {metadata.fileSize} bytes</p>
            <p>GPS Latitude: {metadata.gpsLatitude}</p>
            <p>GPS Longitude: {metadata.gpsLongitude}</p>
          </div>
        ) : (
          <p>Loading metadata...</p>
        )}
        <h3>AI Analysis</h3>
        <ul>
          {aiAnalysis.labels.map((label, index) => (
            <li key={index}>
              {label.description} (score: {label.score.toFixed(2)})
            </li>
          ))}
        </ul>
        <button onClick={() => navigate('/characters')}>Bonus: Go to Starwars Character List</button>
      </div>
    </div>
  )
}

export default AnalysisPage