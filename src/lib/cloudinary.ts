import { v2 as cloudinary } from 'cloudinary'

const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

// Cloudinary se usa solo si están las 3 variables. Si no, el upload cae a disco.
export const cloudinaryEnabled = Boolean(cloudName && apiKey && apiSecret)

if (cloudinaryEnabled) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  })
}

// Sube un buffer a Cloudinary y devuelve la URL https definitiva (CDN).
export function uploadToCloudinary(buffer: Buffer, publicId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'cookies-nym', public_id: publicId, resource_type: 'image', overwrite: true },
      (err, result) => {
        if (err || !result) return reject(err || new Error('Cloudinary no devolvió resultado'))
        resolve(result.secure_url)
      }
    )
    stream.end(buffer)
  })
}
