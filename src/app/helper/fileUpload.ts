import multer from "multer"
import path from "path"

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
const uploadToCloudinary = async (file: Express.Multer.File)=> {
    console.log("Upload is calling", file);
    
}

export const fileUploader = {
  upload,
  uploadToCloudinary
}