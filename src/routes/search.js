const express = require('express');
const searchProducts = require('../controllers/search/searchProducts');
const router = express.Router();

router.get("/products", searchProducts)


module.exports = router