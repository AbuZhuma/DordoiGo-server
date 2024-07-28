const express = require('express');
const filterProducts = require('../controllers/filter/filterProducts');
const filterContainers = require('../controllers/filter/filterContainers');
const router = express.Router();

router.get("/products", filterProducts)
router.get("/containers", filterContainers)

module.exports = router