const express = require('express');
const createChat = require('../controllers/chats/post/createChat');
const checkToken = require('../hooks/checkToken');
const checkReq = require('../hooks/checkReq');
const deleteChat = require('../controllers/chats/delete/deleteChat');
const getChats = require('../controllers/chats/get/getChats');
const createMessage = require('../controllers/chats/post/createMessage');
const router = express.Router();
const WebSocket = require('ws');
const useUserForToken = require('../hooks/useUserForToken');
const wsServer = new WebSocket.Server({port: 9000});
const clients = new Set();

router.post("/chat",checkToken, checkReq, createChat)
router.get("/chat",checkToken, checkReq, getChats)
router.delete("/chat",checkToken, checkReq, deleteChat)
router.post("/chat/message", checkToken, checkReq, createMessage)

wsServer.on('connection', async(wsClient, request) => {
    console.log('New WebSocket connection established');
    const url = request.url.split("?")
    const token = url[1] && url[1].split("=")[1] ? url[1].split("=")[1] : false
    const user = await useUserForToken(token)
    const newAdding = {
        token: token,
        user: user, 
        wsClient: wsClient
    }
    clients.add(newAdding);
    wsClient.on('message', (message) => {
      const textMsg = message.toString("utf-8")
      clients.forEach(client => {
        console.log(client)
        if (client !== wsClient && client.readyState === WebSocket.OPEN) {
            client.wsClient.send(textMsg);
        }
      });
    });
  
    wsClient.on('close', () => {
      console.log('WebSocket connection closed');
      clients.delete(wsClient); 
    });
  
    wsClient.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

module.exports = router