const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User } = require('../models');

// GET route for login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/dashboard');
  } else {
      res.render('login');
  }
});

// GET route for registration page
router.get('/register', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/dashboard');
  } else {
      res.render('register');
  }
});

// Handle registration
router.post('/register', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password
    });

    // New session
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.redirect('/dashboard');
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// Handle login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    // New session
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.redirect('/dashboard');
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  

module.exports = router;
