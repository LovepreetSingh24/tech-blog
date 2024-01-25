const express = require('express');
const router = express.Router();

const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const authRoutes = require('./authRoutes');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/auth', authRoutes);

module.exports = router;
