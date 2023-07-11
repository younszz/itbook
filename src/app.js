const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
import getUserFromJWT from './middlewares/get-user-from-jwt';
import dotenv from 'dotenv';
import viewsRoutes from './routes/views.js';
import productRoutes from './routes/product.js';
import userRoutes from './routes/user.js';
const authRouter = require('./routes/auth');

import categoryRouted from './routes/category';
dotenv.config();
require('./passport')();

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

app.use(categoryRouted);
app.use(productRoutes);
app.use(authRouter);
app.use(userRoutes);

app.use(viewsRoutes);
