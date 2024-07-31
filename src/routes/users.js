const express = require('express');
const router = express.Router();
const authUser = require("../controllers/users/post/authUser")
const regUser = require("../controllers/users/post/regUser");
const deleteUser = require('../controllers/users/delete/deleteUser');
const checkToken = require('../hooks/checkToken');
const checkReq = require('../hooks/checkReq');


router.post("/auth", authUser)

router.post("/reg", regUser)

router.delete("/dell", checkToken, checkReq, deleteUser)

module.exports = router