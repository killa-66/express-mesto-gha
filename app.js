const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '649aec572e6b51d77977794d',
  };

  next();
});
app.use(router);

const mongoUrl = 'mongodb://localhost:27017/mestodb';

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
