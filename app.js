require('dotenv').config();
import path from 'path'
import express from 'express';
import serveStatic from './src/routes/serve-static.js';
import bodyParser  from 'body-parser';
import mongoose from 'mongoose';
import userRoutes from './src/routes/user';
import shopRoutes from './src/routes/shop.js';




const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(userRoutes);


app.use('/', serveStatic('home'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(shopRoutes);

mongoose
  .connect(
    'mongodb+srv://Gwanggaeto:Gwang1234@cluster0.o8ndafw.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
