const express = require('express');
const router = express.Router();

const addProduct = require('../controllers/container/post/addProduct');
const deleteProduct = require('../controllers/container/delete/deleteProduct');
const getProducts = require('../controllers/container/get/getPoducts');
const editProduct = require('../controllers/container/put/editProduct');
const addFeadBack = require('../controllers/container/post/addFeadBack');

router.get("/product", getProducts)
router.post("/product", addProduct)
router.delete("/product", deleteProduct)
router.put("/product", editProduct)

router.post("/product/feadback", addFeadBack)
module.exports = router