


import Image from '../models/Imag-model.js';


export async function toggleLike(req, res) {
  try {
    const { id } = req.params; // معرف الصورة
    const userId = req.user.id;

    const Imag = await Image.findById(id);
    if (!Imag) {
      return res.status(404).json({ message: 'الصورة غير موجودة' });
    }

    const hasLiked = Imag.likes.includes(userId);

    if (hasLiked) {
      // إزالة الإعجاب
      Imag.likes = Imag.likes.filter(uid => uid.toString() !== userId);
    } else {
      // إضافة الإعجاب
      Imag.likes.push(userId);
    }

    await Imag.save();

    res.status(200).json({
      message: hasLiked ? 'تم إزالة الإعجاب' : 'تم الإعجاب',
      likesCount: Imag.likes.length,
      likedByCurrentUser: !hasLiked
    });

  } catch (error) {
    res.status(500).json({ message: 'خطأ أثناء تعديل الإعجاب', error });
  }
}
