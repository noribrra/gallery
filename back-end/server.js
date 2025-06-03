import express from 'express';
import path from 'path';
import morgan from 'morgan';
import authrouter from './routes/auth-router.js';
import imagerouter from './routes/image-router.js';
import getPhoto from './routes/get-image.js';
import likerouter from './routes/like-router.js';
import cors from 'cors';
import "dotenv/config";
import connectDB from './utils/db.js';


connectDB()
const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/images', express.static(path.join(path.resolve(), 'images')));
app.use(express.static(path.join(path.resolve(), '../front-end/build')));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.resolve(path.resolve(), '../front-end/build', 'index.html'));
});



app.use("/api/auth", authrouter);
app.use("/api/photo", imagerouter);
app.use("/api/get/", getPhoto);
app.use("/api/", likerouter);







app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!" });
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}   
);