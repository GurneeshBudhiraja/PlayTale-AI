import { v2 as cloudinary } from 'cloudinary';
import fs from "node:fs"

class Cloudinary {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })
  }
  async uploadFile(localFilePath: string) {
    // upload file on cloudinary
    try {
      return (await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
        access_mode: "public"
      })).url
    } catch (error) {
      return null
    } finally {
      fs.unlinkSync(localFilePath)
    }
  }
}


export default Cloudinary