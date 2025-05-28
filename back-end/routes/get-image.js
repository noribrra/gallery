import express from 'express';
import { getPhotos ,getPhotoById,getPhotosByUser,getLikedPhotos} from '../controllers/get-image-controller.js';
import{ authenticateuserOptional } from '../middleware/authenticateOptional.js';
import { authenticateuser } from "../middleware/auth-middleware.js";



const getPhoto = express.Router();

// API لجلب الصور مع pagination

getPhoto.get('/photos/me', authenticateuser, getLikedPhotos);
getPhoto.get('/photos', authenticateuserOptional, getPhotos);
getPhoto.get('/photos/:id',authenticateuserOptional, getPhotoById);
getPhoto.get('/photos/user/:userId',authenticateuserOptional, getPhotosByUser);
// API لجلب صورة واحدة حسب ID


export default getPhoto;
