

const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); 

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find(); 
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/', async (req, res) => {

  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  });

  try {
    const savedPost = await newPost.save(); 
    res.status(201).json(savedPost); 
  } catch (err) {
    res.status(400).json({ message: err.message }); 
  }
});
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id, 
      req.body,       
      { new: true, runValidators: true } 
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post nahi mila' });
    }
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id); 

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post nahi mila' });
    }
    res.json({ message: 'Post successfully delete ho gaya' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;