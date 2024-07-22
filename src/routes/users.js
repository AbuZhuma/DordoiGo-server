const express = require('express');
const router = express.Router();

const authUser = require("../controllers/users/post/authUser")
const regUser = require("../controllers/users/post/regUser");
const checkToken = require('../hooks/checkToken');
const deleteUser = require('../controllers/users/delete/deleteUser');


router.post("/auth", authUser)

router.post("/reg", regUser)

router.delete("/dell", deleteUser)

module.exports = router