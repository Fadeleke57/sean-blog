const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const Post = require('../models/Post');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });

const router = express.Router();
const secret = process.env.REACT_APP_SECRET_HASH;

router.post('/post', uploadMiddleware.single('file'), async (req, res) => { //create a post

  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);
  //const { token } = req.cookies;
  token = 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNlYW4iLCJpZCI6IjY2NWNlZGQwZWFiNWIxMWM5NGYxN2EzOSIsImlhdCI6MTcxNzUyNzMzMn0.BgylBjLDHekIKYfpCkoHUSt6snXoHar7Jwey997vXf0'
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;

    const { category, title, summary, content } = req.body;
    const postDoc = await Post.create({
      category,
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});

router.get('/post', async (req, res) => { //get posts

  const posts = await Post.find()
    .populate('author', ['username'])
    .sort({ createdAt: -1 })
    .limit(20);

  res.json(posts);
});

router.put('/post', uploadMiddleware.single('file'), async (req, res) => { //edit posts

  let newPath = null;

  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  console.log(token)

  if (!token) {
    return res.status(401).json({ error: 'Authentication token is missing' });
  }
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });

    const { id, category, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(403).json('INVALID PERMISSION');
    }
    postDoc.category = category;
    postDoc.title = title;
    postDoc.summary = summary;
    postDoc.content = content;
    postDoc.cover = newPath ? newPath : postDoc.cover;

    await postDoc.save();
    res.json(postDoc);
  });
});

router.get('/post/:id', async (req, res) => { //get specific post
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
});

module.exports = router;