const express = require('express');
const editProfile = require('../controllers/profiles/put/editProfile');
const router = express.Router();


router.put('/edit', editProfile)

module.exports = router