const express = require('express');
const router = express.Router();

const addProduct = require('../controllers/products/post/addProduct');
const deleteProduct = require('../controllers/products/delete/deleteProduct');
const getProducts = require('../controllers/products/get/getPoducts');
const editProduct = require('../controllers/products/put/editProduct');
const addFeadBack = require('../controllers/products/post/addFeadBack');
const checkReq = require('../hooks/checkReq');
const checkToken = require('../hooks/checkToken');

router.get("/product", getProducts)
router.post("/product",checkToken, checkReq, addProduct)
router.delete("/product", checkToken, checkReq, deleteProduct)
router.put("/product", checkToken, checkReq, editProduct)

router.post("/product/feadback", addFeadBack)
module.exports = router