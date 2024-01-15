const express = require('express');
const router = express.Router();

const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const authRoutes = require('./authRoutes'); // Import


// Use the imported routes
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/auth', authRoutes); // Add this line to define the prefix for auth routes

module.exports = router;
