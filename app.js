import express from 'express';
import serveStatic from './src/routes/serve-static.js';

const app = express();

app.use('/', serveStatic('home'));

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});
