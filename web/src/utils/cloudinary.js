export const CLOUDINARY_CLOUD_NAME = 'mikemike'

export const cldVideoFormats = [
  {
    format: 'video/webm',
    ext: 'webm'
  },
  {
    format: 'video/mp4',
    ext: 'mp4'
  },
  {
    format: 'video/ogg',
    ext: 'ogv'
  }
]

export const cldGetVideoUrl = ({ type, public_id }, options) => {
  // const dpr = (typeof window !== undefined && window.devicePixelRatio) || 1
  const transformations = `f_auto,q_auto:best${
    options.blur ? ',e_blur:2000' : ''
  }` // `q_auto:best,dpr_${dpr}`
  return cldVideoFormats.map(({ ext, format }) => {
    return {
      type: format,
      ext,
      src: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/${type}/${transformations}/${public_id}.${ext}`
    }
  })
}
