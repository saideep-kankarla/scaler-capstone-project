const path = require('path');

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const connectDB = require('./db');

const userRoutes = require('./routes/UserRoutes');
const albumRoutes = require('./routes/AlbumRoutes');
const paymentRoutes = require('./routes/PaymentRoutes');

require('dotenv').config();

const app = express();

app.use(
  cors({
    origin: [process.env.REACT_APP_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(express.json());
app.use('/posters', express.static(path.join(__dirname, 'uploads/posters')));
app.use('/mp3', express.static(path.join(__dirname, 'uploads/songs')));

app.use(express.urlencoded({ extended: true })); // for URL-encoded bodies

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke on audiio app server !');
});

// app.use(verifyToken);

// user routes
app.use('/api/users', userRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/payments', paymentRoutes);

app.use('/', (req, res) => {
  res.send('Welcome to audiio app server!');
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to mongo database:', err);
    process.exit(1);
  });
