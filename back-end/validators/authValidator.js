import { body } from 'express-validator';

export const registerValidation = [
  body('name')
    .notEmpty().withMessage('الاسم مطلوب')
    .isLength({ min: 4 }).withMessage('الاسم يجب أن يكون على الأقل 4 أحرف')
    .matches(/^[A-Za-z][A-Za-z0-9_ ]*$/).withMessage('يجب أن يبدأ الاسم بحرف ويمكن أن يحتوي على أحرف أو أرقام أو فراغات'),

  body('email')
    .notEmpty().withMessage('البريد الإلكتروني مطلوب')
    .isEmail().withMessage('البريد الإلكتروني غير صالح'),

  body('password')
    .notEmpty().withMessage('كلمة المرور مطلوبة')
    .isLength({ min: 6 }).withMessage('كلمة المرور يجب أن تكون على الأقل 6 أحرف')
];

export const loginValidation = [
  body('email')
    .notEmpty().withMessage('البريد الإلكتروني مطلوب')
    .isEmail().withMessage('البريد الإلكتروني غير صالح'),

  body('password')
    .notEmpty().withMessage('كلمة المرور مطلوبة')
];



