require('dotenv').config();
import path from 'path';
import express from 'express';
import serveStatic from './routes/serve-static.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import userRoutes from './routes/user';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


app.use('/', serveStatic('home'));
app.use('/mypage', serveStatic('mypage'));
app.use('/ordercheck', serveStatic('ordercheck'));
app.use('/cart', serveStatic('cart'));
app.use('/product/:pid', serveStatic('product-detail'));

app.use('/admin/products', serveStatic('admin-products'));
app.use('/admin/products/edit', serveStatic('admin-products-edit'));
app.use('/admin/products/add', serveStatic('admin-products-edit'));
app.use('/admin/orders', serveStatic('admin-orders'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);

mongoose
  .connect(
    'mongodb+srv://Gwanggaeto:Gwang1234@cluster0.o8ndafw.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
