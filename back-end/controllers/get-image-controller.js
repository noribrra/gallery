import Photo from '../models/PhotoModel.js';


export async function getPhotos(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 15;
      const skip = (page - 1) * limit;
  
      const userId = req.user?.id; // قد يكون undefined إذا لم يسجل المستخدم الدخول
        
      const photos = await Photo.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'user',
          select: 'name _id ' // فقط صاحب الصورة
        })
        .lean(); // للحصول على كائن عادي بدل Document
  
      const photosWithLikeCount = photos.map(photo => {
        const likesCount = photo.likes.length;
        const likedByCurrentUser = userId
          ? photo.likes.some(likeId => likeId.toString() === userId)
          : false;
  
        return {
          ...photo,
          likesCount,
          likedByCurrentUser
        };
      });
  
      const total = await Photo.countDocuments();
  
      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        photos: photosWithLikeCount
      });
  
    } catch (error) {
      res.status(500).json({ message: 'خطأ أثناء جلب الصور', error });
    }
  }



//   get photo by id
//   🟩 جلب صورة بواسطة المعرف


  export async function getPhotoById(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user ? req.user.id : null;
  
      const photo = await Photo.findById(id)
        .populate('user', 'name') // عرض اسم صاحب الصورة فقط
        .lean();
  
      if (!photo) {
        return res.status(404).json({ message: 'الصورة غير موجودة' });
      }
  
      const likesCount = photo.likes.length;
      const likedByCurrentUser = userId ? photo.likes.some(uid => uid.toString() === userId) : false;
  
      res.status(200).json({
        _id: photo._id,
        title: photo.title,
        description: photo.description,
        imageUrl: photo.imageUrl,
        createdAt: photo.createdAt,
        user: photo.user,
        likesCount,
        likedByCurrentUser
      });
  
    } catch (error) {
      res.status(500).json({ message: 'حدث خطأ أثناء جلب الصورة', error });
    }
  }



// get photos by user id
// 🟩 جلب صور بواسطة معرف المستخدم

  export async function getPhotosByUser(req, res) {
    try {
      const { userId } = req.params;
      const currentUserId = req.user?.id; // يُفترض أنك تستخدم Middleware للمصادقة يضيف req.user
       
      const photos = await Photo.find({ user: userId })
        .sort({ createdAt: -1 })
        .populate('user', 'name',) // لعرض اسم وصورة صاحب الصورة;
  
      const formattedPhotos = photos.map(photo => ({
        _id: photo._id,
        title: photo.title,
        description: photo.description,
        imageUrl: photo.imageUrl,
        createdAt: photo.createdAt,
        user: photo.user,
        likesCount: photo.likes.length,
        likedByCurrentUser: currentUserId
          ? photo.likes.some(user => user.equals(currentUserId))
          : false
      }));
  
      res.status(200).json(formattedPhotos);
    } catch (error) {
      res.status(500).json({ message: 'حدث خطأ أثناء جلب الصور لهذا المستخدم', error });
    }
  }

// get liked photos
// 🟩 جلب الصور التي أعجب بها المستخدم

  export async function getLikedPhotos(req, res) {
    try {
      const userId = req.user.id;
        console.log(userId);
      const photos = await Photo.find({ likes: userId })
        .sort({ createdAt: -1 })
        .populate('user', 'name'); // لعرض اسم صاحب الصورة
  
      const formattedPhotos = photos.map(photo => ({
        _id: photo._id,
        title: photo.title,
        description: photo.description,
        imageUrl: photo.imageUrl,
        createdAt: photo.createdAt,
        user: photo.user,
        likesCount: photo.likes.length,
        likedByCurrentUser: true // لأننا نعلم أن المستخدم أعجب بها
      }));
  
      res.status(200).json(formattedPhotos);
    } catch (error) {
      res.status(500).json({ message: 'حدث خطأ أثناء جلب الصور التي أعجبت بها', error });
    }
  }