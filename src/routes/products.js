const express = require('express');
const router = express.Router();

const addProduct = require('../controllers/products/post/addProduct');
const deleteProduct = require('../controllers/products/delete/deleteProduct');
const getProducts = require('../controllers/products/get/getPoducts');
const editProduct = require('../controllers/products/put/editProduct');
const addFeadBack = require('../controllers/products/post/addFeadBack');

router.get("/product", getProducts)
router.post("/product", addProduct)
router.delete("/product", deleteProduct)
router.put("/product", editProduct)

router.post("/product/feadback", addFeadBack)
module.exports = router