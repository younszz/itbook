import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import getUserFromJWT from './middlewares/get-user-from-jwt';
import dotenv from 'dotenv';
import viewsRoutes from './routes/views.js';
import productRoutes from './routes/product.js';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth';
import categoryRoutes from './routes/category';
import initPassport from './passport';

dotenv.config();
initPassport();

mongoose
  .connect(
    'mongodb+srv://Gwanggaeto:Gwang1234@cluster0.o8ndafw.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(passport.initialize());
// jwt 로그인 미들웨어 추가
app.use(getUserFromJWT);

app.use(categoryRoutes);
app.use(productRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(viewsRoutes);
