const express = require('express');
const editProfile = require('../controllers/profiles/put/editProfile');
const getListUsers = require('../controllers/profiles/get/getListProfiles');
const checkToken = require('../hooks/checkToken');
const checkReq = require('../hooks/checkReq');
const router = express.Router();


router.put('/edit', checkToken, checkReq, editProfile)

router.get("/list", getListUsers)

module.exports = router