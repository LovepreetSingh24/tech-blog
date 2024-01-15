const router = require('express').Router();
const { Post } = require('../models');

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll();
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('home', { posts }); // This matches the name of your handlebars file
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;
