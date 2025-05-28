import jwt from "jsonwebtoken";

export function authenticateuser(req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Please login to access this route" });
    }

   
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        req.user = user;
        next(); // ✅ Moves to the next middleware
    });
}
