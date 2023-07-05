console.log('hi')
import path from 'path'
import express from 'express';
import serveStatic from './routes/serve-static.js';
import bodyParser  from 'body-parser';
import mongoose from 'mongoose';

import shopRoutes from './routes/shop.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', serveStatic('home'));
app.use('/mypage', serveStatic('mypage'));
app.use('/ordercheck', serveStatic('ordercheck'));
app.use('/cart', serveStatic('cart'));
app.use('/product/:pid', serveStatic('product-detail'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(shopRoutes);

mongoose
  .connect(
    'mongodb+srv://Gwanggaeto:Gwang1234@cluster0.o8ndafw.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
