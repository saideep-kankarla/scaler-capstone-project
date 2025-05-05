const path = require('path');

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const connectDB = require('./db');

const userRoutes = require('./routes/UserRoutes');
const albumRoutes = require('./routes/AlbumRoutes');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(helmet());

app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
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

app.use('/', (req, res) => {
  res.send('Welcome to audiio app server!');
});

connectDB()
  .then(() => {
    app.listen(8080, () => {
      console.log('Server started on port 8080');
    });
  })
  .catch((err) => {
    console.error('Failed to connect to mongo database:', err);
    process.exit(1);
  });
