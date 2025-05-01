const express = require('express');
const helmet = require('helmet');

const connectDB = require('./db');

const userRoutes = require('./routes/UserRoutes');

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke on audiio app server !');
});

// user routes
app.use('/users', userRoutes);

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
