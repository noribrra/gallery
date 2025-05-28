import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// تحديد المسار الصحيح بناءً على نوع ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// تخزين الصور في مجلد backend/images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, '..', 'images')); // ← 🟩 حفظ في مجلد backend/images
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

// السماح فقط بصيغ الصور
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only .png or .jpeg images are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
