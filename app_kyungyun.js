//npm install dotenv
//npm install express
//npm install -g nodemon
//npm install passport-jwt


const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const app = express();

app.use(express.json()); //

mongoose.connect('mongodb://localhost/myshop', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use('/api/user', userRoutes);
app.use('/admin', adminRoutes); //URL경로

app.listen(3000, () => console.log('Server is running on port 3000...'));
