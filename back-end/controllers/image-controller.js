import Image from '../models/Imag-model.js';

import fs from 'fs';
import path from 'path';

// إنشاء صورة جديدة
// 🟩 إنشاء صورة جديدة
export async function createPhoto(req, res) {
    try {
      const { title, description } = req.body;
  
      if (!req.file) {
        return res.status(400).json({ message: 'Image is required' });
      }
  
      // 🟢 مسار الوصول للصورة عبر الإنترنت
      const imageUrl = `/images/${req.file.filename}`;
  
      const photo = await Image.create({
        title,
        description,
        imageUrl,          // ← 🟢 رابط الصورة العام
        user: req.user.id,
      });
  
      res.status(201).json(photo);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create photo', error });
    }
  }

// تعديل الصورة (العنوان أو الوصف فقط)
export async function updatePhoto(req, res) {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const imageDoc = await Image.findById(id); // ✅ استخدام اسم متغير مختلف

    if (!imageDoc) {
      return res.status(404).json({ message: 'Image not found' });
    }

    if (imageDoc.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to edit this image' });
    }

    imageDoc.title = title || imageDoc.title;
    imageDoc.description = description || imageDoc.description;

    await imageDoc.save();

    res.json(imageDoc);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update photo', error });
  }
};

// حذف صورة
export async function deletePhoto  (req, res) {
  try {
    const { id } = req.params;

    const photo = await Image.findById(id);

    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    if (photo.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this photo' });
    }

    // حذف الصورة من المجلد
    const filePath = path.join('images', path.basename(photo.imageUrl));
    fs.unlink(filePath, (err) => {
      if (err) console.error('Image file not deleted:', err);
    });

    await photo.deleteOne();

    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete photo', error });
  }
};
