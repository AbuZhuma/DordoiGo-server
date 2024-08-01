const express = require('express');
const editContainer = require('../controllers/containers/editContainer');
const checkReq = require('../hooks/checkReq');
const checkToken = require('../hooks/checkToken');
const router = express.Router();

router.put("/edit",checkToken, checkReq, editContainer)

module.exports = router