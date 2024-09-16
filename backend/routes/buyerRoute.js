// routes/buyerRoute.js
const express = require('express');
const router = express.Router();
const { registerBuyer } = require('../controllers/buyerController');

// Route to register a new buyer
router.post('/register', registerBuyer);

module.exports = router;
backend/routes/buyerRoute.js

// const express = require('express');
// const { createBuyer, getAllBuyers, getBuyerById, updateBuyerById, deleteBuyerById } = require('../controllers/buyerController');

// const router = express.Router();

// router.post('/', createBuyer);
// router.get('/', getAllBuyers);
// router.get('/:id', getBuyerById);
// router.put('/:id', updateBuyerById);
// router.delete('/:id', deleteBuyerById);

// module.exports = router;
