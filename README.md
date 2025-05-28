# 📸 Image Gallery API

This is a RESTful API for an **Image Gallery** built using **Node.js**, **Express**, and **MongoDB**.

## 🚀 Features

- 🧑 User registration & login using JWT
- 📤 Upload images with title, description, and image URL
- ❤️ Like/unlike toggle on photos
- 🔍 View public photos (paginated, visible to everyone)
- 👤 View photos by specific users
- 👍 View liked photos of the authenticated user
- ✅ Clean input validation using express-validator
- 🔐 Protected routes for certain actions

---

## 🧩 Tech Stack

- Node.js, Express
- MongoDB, Mongoose
- JWT for authentication
- Multer for file uploads
- express-validator for data validation

---

## 📦 Install & Run

```bash
git clone https://github.com/your-username/image-gallery-api.git
cd back-end
npm install
npm start
Create a .env file with:

env
نسخ
تحرير
PORT=3000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret


🔐 Authentication Routes (/api/auth)
Method	Endpoint	Description
POST	/register	Register a new user
POST	/login	Login and receive JWT token
GET	/auth	Verify JWT and get user info

🖼️ Photo Routes (/api/photo, /api/get, /api)
Method	Endpoint	Description
POST	/photo/create	Upload a new photo (auth required)
PUT	/photo/update/:id	Update photo (only by owner)
DELETE	/photo/delete/:id	Delete photo (only by owner)
GET	/get/photos	Get all photos (public, paginated)
GET	/get/photos/:id	Get a single photo by ID
GET	/get/photos/user/:userId	Get photos by a specific user
GET	/get/photos/me	Get liked photos (auth required)
POST	/photos/:id/like	Toggle like/unlike (auth required)

🧪 Models
👤 User
js
نسخ
تحرير
{
  name: String,
  email: String,
  password: String,
  createdAt: Date
}
🖼️ Photo
js
نسخ
تحرير
{
  title: String,
  description: String,
  imageUrl: String,
  user: ObjectId,
  likes: [ObjectId],
  createdAt: Date
}
🛡️ Middleware
authenticateuser - Requires valid JWT

authenticateuserOptional - Allows both guests and authenticated users

validate - Runs express-validator and returns errors

📌 Notes
Anyone can view photos

Only logged-in users can like/unlike photos

Pagination supported via query ?page=1

Likes count and likedByCurrentUser returned in GET responses



