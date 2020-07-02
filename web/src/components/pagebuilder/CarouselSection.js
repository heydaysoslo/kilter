import React from 'react'
import Carousel from '../elements/Carousel'
import CloudinaryImage from '../elements/CloudinaryImage'

const CarouselSection = ({ images, aspectRatio = 'original' }) => {
  if (!images) return null

  return (
    <div className="CarouselSection">
      <Carousel>
        {images.map(image => (
          <CloudinaryImage
            key={image._key}
            node={image}
            aspectRatio={aspectRatio}
          />
        ))}
      </Carousel>
    </div>
  )
}

export default CarouselSection
