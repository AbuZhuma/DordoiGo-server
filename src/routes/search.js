const express = require('express');
const searchProducts = require('../controllers/search/searchProducts');
const searchContainers = require('../controllers/search/searchContainers');
const router = express.Router();

router.get("/products", searchProducts)
router.get("/containers", searchContainers)

module.exports = router