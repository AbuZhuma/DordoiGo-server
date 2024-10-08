const express = require('express');
const createChat = require('../controllers/chats/post/createChat');
const checkToken = require('../hooks/checkToken');
const checkReq = require('../hooks/checkReq');
const deleteChat = require('../controllers/chats/delete/deleteChat');
const getChats = require('../controllers/chats/get/getChats');
const router = express.Router();

router.post("/chat",checkToken, checkReq, createChat)
router.get("/chat",checkToken, checkReq, getChats)
router.delete("/chat",checkToken, checkReq, deleteChat)

module.exports = router