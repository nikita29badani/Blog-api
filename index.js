
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000; 
const postRoutes = require('./routes/posts'); 
require('dotenv').config();
app.use(express.json());
app.use(cors());
const mongouri=process.env.DATABASE_URL;
console.log(mongouri)
mongoose.connect(mongouri)
  .then(() => console.log('MongoDB successfully connected!'))
  .catch(err => console.error('MongoDB connection failed:', err));

app.get('/', (req, res) => {
  console.log('Server is running');
  res.send('Blog API!');
});
app.use('/posts', postRoutes);


app.listen(port, () => {
  console.log(`Server is runnig at http://localhost:${port}`);
});