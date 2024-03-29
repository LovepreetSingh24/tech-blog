const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const withAuth = require('../utils/withAuth');

// Get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('all-posts', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single post by id
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        if (postData) {
            const post = postData.get({ plain: true });
            res.render('single-post', { post });
        } else {
            res.status(404).json({ message: 'No post found with this id!' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            userId: req.session.userId
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
                userId: req.session.userId
            }
        });

        if (updatedPost > 0) {
            res.status(200).json(updatedPost);
        } else {
            res.status(404).json({ message: 'No post found with this id!' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
    
// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId
            }
        });
        if (deletedPost) {
            res.status(200).json(deletedPost);
        } else {
            res.status(404).json({ message: 'No post found with this id!' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
        
module.exports = router;
