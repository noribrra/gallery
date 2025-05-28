import express from "express";
import { login,register } from "../controllers/auth-controller.js";
import { loginValidation,registerValidation } from "../validators/authValidator.js";
import { validate } from "../middleware/validate.js";
import { authenticateuser } from "../middleware/auth-middleware.js";
const authrouter = express.Router();

authrouter.post("/login",loginValidation,validate, login); 
authrouter.post("/register",registerValidation,validate, register); 
authrouter.get("/auth",authenticateuser, (req, res) => {
    res.json({ message: "Hello World" });
}
); 





export default authrouter;