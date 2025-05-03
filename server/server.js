const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const connectDB = require('./db');

const userRoutes = require('./routes/UserRoutes');
const premiumRoutes = require('./routes/premiumRoutes');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke on audiio app server !');
});

// app.use(verifyToken);

// user routes
app.use('/api/users', userRoutes);
app.use('/api/premium', premiumRoutes);

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
