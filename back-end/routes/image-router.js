import express from 'express';
import { authenticateuser } from "../middleware/auth-middleware.js";

import { createPhoto, deletePhoto, updatePhoto } from '../controllers/image-controller.js';7
import upload from '../middleware/upload.js';

const imagerouter = express.Router();

// ✅ إنشاء صورة جديدة
imagerouter.post("/create", authenticateuser, upload.single('image'), createPhoto);

// ✅ تعديل الصورة (العنوان أو الوصف)
imagerouter.put("/update/:id", authenticateuser, updatePhoto);

// ✅ حذف الصورة
imagerouter.delete("/delete/:id", authenticateuser, deletePhoto);

export default imagerouter;
