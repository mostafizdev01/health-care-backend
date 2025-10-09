import multer from "multer"
import path from "path"
import config from "../../config"
import { v2 as cloudinary} from "cloudinary"

const storage = multer.diskStorage({ // ai file ta multar pakage theke neuya hoise.
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/uploads"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

// upload image in multer to cloudinary
const uploadToCloudinary = async (file: Express.Multer.File) => {
  cloudinary.config({
    cloud_name: config.CLOUDE_NAME,
    api_key: config.API_KEY,
    api_secret: config.API_SECRET
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(
      file.path, {
      public_id: file.filename,
    }
    )
    .catch((error) => {
      console.log(error);
    });
  return uploadResult;

}

export const fileUploader = {
  upload,
  uploadToCloudinary
}