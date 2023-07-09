import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import viewsRoutes from './routes/views.js';
import productRoutes from './routes/product.js';
import categoryRoutes from './routes/category.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

//Routes
// app.use(userRoutes);
app.use(categoryRoutes)
app.use(productRoutes);
app.use(viewsRoutes);

mongoose
  .connect(
    'mongodb+srv://Gwanggaeto:Gwang1234@cluster0.o8ndafw.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
