require('dotenv').config();
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import viewsRoutes from './routes/views.js';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop.js';
import userRoutes from './routes/user';

const app = express();

//미들웨어 파싱
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

//Routes
app.use(userRoutes);
app.use(viewsRoutes);
app.use(adminRoutes);
app.use(shopRoutes);

mongoose
  .connect(
    'mongodb+srv://Gwanggaeto:Gwang1234@cluster0.o8ndafw.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
