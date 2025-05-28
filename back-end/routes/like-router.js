import express from 'express';
import { toggleLike } from '../controllers/like-controller.js';
import { authenticateuser } from "../middleware/auth-middleware.js";


const likerouter = express.Router();

likerouter.post('/photos/:id/like', authenticateuser, toggleLike);

export default likerouter;
