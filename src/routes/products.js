const express = require('express');
const router = express.Router();

const addProduct = require('../controllers/products/post/addProduct');

router.post("/add", addProduct)

module.exports = router