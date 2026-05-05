import multer from 'multer'

// Configure storage (in memory for handling before Supabase upload)
const storage = multer.memoryStorage()

// File filter to allow video, audio, and images
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['video/', 'audio/', 'image/']
  if (allowedMimeTypes.some(type => file.mimetype.startsWith(type))) {
    cb(null, true)
  } else {
    cb(new Error('Only video, audio, and image files are allowed!'), false)
  }
}

// Multer instance with different size limits
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // Default 50MB (for videos)
  }
})
