const express = require('express');
const router = express.Router();

const addProduct = require('../controllers/container/post/addProduct');

router.post("/addproduct", addProduct)

module.exports = router