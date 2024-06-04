const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
//const multer = require('multer');
//const uploadMiddleware = multer({ dest: 'uploads/' });

const configureMiddleware = (app) => {
  const allowedOrigins = ['http://localhost:3000', 'https://sic-kappa.vercel.app', 'https://sean-blog-server.onrender.com'];

  app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  }));
    
  app.use(express.json());
  app.use(cookieParser());
  app.use('/uploads', express.static(__dirname + '/uploads'));
  //app.use(uploadMiddleware.single('file'));
};

module.exports = configureMiddleware;