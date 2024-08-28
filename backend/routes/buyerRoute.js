// routes/buyerRoute.js
const express = require('express');
const router = express.Router();
const { registerBuyer } = require('../controllers/buyerController');

// Route to register a new buyer
router.post('/register', registerBuyer);

module.exports = router;
