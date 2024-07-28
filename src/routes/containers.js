const express = require('express');
const editContainer = require('../controllers/containers/editContainer');
const router = express.Router();

router.put("/edit", editContainer)


module.exports = router