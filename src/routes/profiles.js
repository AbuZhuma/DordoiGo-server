const express = require('express');
const editProfile = require('../controllers/profiles/put/editProfile');
const getListUsers = require('../controllers/profiles/get/getListProfiles');
const router = express.Router();


router.put('/edit', editProfile)

router.get("/list", getListUsers)

module.exports = router