import Users from "../models/User-model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/helpers.js";

export async function register(req, res) {
    
    const { name,email, password } = req.body;
    const user = await Users.findOne({ email });
      if (user) {
          return res.status(401).json({ errors:[
                {message: "user already exists"}
          ]  });
      }
     const hashPassword = await bcrypt.hash(password, 10);
     const newUser = await Users.create({ name,email, password: hashPassword }); 
     const token = generateToken(newUser.id);

     return res.status(201).json({ token, user:{id:newUser.id,
        name:newUser.name,
        email:newUser.email,
     } });

}

export async function login(req, res) {
    const { email, password } = req.body;
    
    const user = await Users.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });    
    }
    const token = generateToken(user.id);
    return res.status(200).json({ token, user:{id:user.id,
        name:user.name,
        email:user.email,
        isadmin:user.isadmin,
     } });
}


