import { Container } from '@mui/material'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'

const UploadImages = (props) => {
  const [images, setImages] = useState([]);

  return (
    <Container>
      <h1>Upload images</h1>
      <Dropzone
        className="dropzone"
        onChange={(e) => {setImages(e.target.value)}}
        value={images}
      >
        {({getRootProps, getInputProps}) => {
          <section>
            <div {...getRootProps({className: "dropzone"})}>
              <span>File</span>
              <p>Drag and drop your images here, or click to select the images</p>
            </div>
          </section>
        }}
      </Dropzone>
    </Container>
  )
}

export default UploadImages