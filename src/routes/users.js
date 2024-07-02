const express = require('express');
const router = express.Router();

const authUser = require("../controllers/users/authUser")
const regUser = require("../controllers/users/regUser")


router.post("/auth", authUser)

router.post("/reg", regUser)

module.exports = router