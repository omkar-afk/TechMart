const express = require('express');
const cors = require('cors');
require('dotenv').config();
const errorHandler = require('./src/middleware/error');
const apiRouter = require('./src/router');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/data', express.static(path.join(__dirname, '/src/data')))

const PORT = process.env.PORT || 3000;

app.use('/api',apiRouter);
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});