const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');

const configureMiddleware = (app) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'https://sic-kappa.vercel.app',
    'https://sean-blog-server.onrender.com',
    'https://sean-blog-7zp3.onrender.com'
  ];

  app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  }));

  app.use(express.json());
  app.use(cookieParser());
  app.use('/uploads', express.static(__dirname + '/uploads'));
};

module.exports = configureMiddleware;