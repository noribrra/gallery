import jwt from "jsonwebtoken";

export function authenticateuserOptional(req, res, next) {
  const token = req.header("Authorization");




  if (!token) {
    return next(); // المستخدم غير مسجل دخول، نتابع بدون خطأ
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (!err && user) {
        
      req.user = user;
    }
    next(); // نتابع بغض النظر إذا كان التوكن صالح أو لا
  });
}
