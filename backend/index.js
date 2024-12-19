const express = require('express');
const cors = require('cors');
require('dotenv').config();
const errorHandler = require('./src/middleware/error');
const apiRouter = require('./src/router');
const path = require('path');

const app = express();
app.use(express.json());

// Modified CORS configuration
app.use(cors({
  // Allow requests from your frontend domain
  origin: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5173'  // Your Vite dev server
    : ['your-production-frontend-domain.com'], // Add your production frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/data', express.static(path.join(__dirname, '/src/data')))

const PORT = process.env.PORT || 3000;

app.use('/api', apiRouter);
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;