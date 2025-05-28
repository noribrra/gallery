import Photo from '../models/Photo-model.js';

export async function toggleLike(req, res) {
  try {
    const { id } = req.params; // معرف الصورة
    const userId = req.user.id;

    const photo = await Photo.findById(id);
    if (!photo) {
      return res.status(404).json({ message: 'الصورة غير موجودة' });
    }

    const hasLiked = photo.likes.includes(userId);

    if (hasLiked) {
      // إزالة الإعجاب
      photo.likes = photo.likes.filter(uid => uid.toString() !== userId);
    } else {
      // إضافة الإعجاب
      photo.likes.push(userId);
    }

    await photo.save();

    res.status(200).json({
      message: hasLiked ? 'تم إزالة الإعجاب' : 'تم الإعجاب',
      likesCount: photo.likes.length,
      likedByCurrentUser: !hasLiked
    });

  } catch (error) {
    res.status(500).json({ message: 'خطأ أثناء تعديل الإعجاب', error });
  }
}
