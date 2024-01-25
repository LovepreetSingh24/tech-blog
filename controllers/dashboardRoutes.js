const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const withAuth = require('../utils/withAuth');

// GET route to display the dashboard with user's posts
router.get('/', withAuth, async (req, res) => {
  try {
    const userPosts = await Post.findAll({
      where: {
        userId: req.session.userId
      }
    });
    // Convert the sequelize objects into plain objects
    const posts = userPosts.map(post => post.get({ plain: true }));
    res.render('dashboard', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST route to create new post
router.post('/posts', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      userId: req.session.userId
    });
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// PUT route to update an existing post
router.put('/:id', withAuth, async (req, res) => {
  try {
    await Post.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.session.userId
      }
    });
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE route to delete an existing post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId
      }
    });
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
