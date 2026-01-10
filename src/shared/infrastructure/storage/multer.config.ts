import multer from "multer";

const storage = multer.memoryStorage()
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter(_, file, callback) {
    const allowed = ["image/jpg", "image/jpeg", "image/webp"]
    if (!allowed.includes(file.mimetype)) {
      throw new Error("Formato de archivo no permitido.")
    }
    return callback(null, true)
  },
});
