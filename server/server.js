const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet());

app.get('/', (req, res) => {
  res.send('Welcome to Chat App!');
});

app.listen(8080, () => {
  console.log('Server is running on port 3000');
});
