const express = require('express');
const searchProducts = require('../controllers/search/searchProducts');
const searchContainers = require('../controllers/search/searchContainers');
const checkToken = require('../hooks/checkToken');
const router = express.Router();

router.get("/products", checkToken, searchProducts)
router.get("/containers", checkToken, searchContainers)

module.exports = router