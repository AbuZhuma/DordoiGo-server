const express = require('express');
const createChat = require('../controllers/chats/post/createChat');
const router = express.Router();

router.post("/chat", createChat)

module.exports = router