const WebSocket = require('ws');
const useUserForToken = require('../hooks/useUserForToken');
const wsServer = new WebSocket.Server({ port: 9001 });
const clients = new Set();

const initWebSocket = () => {
  wsServer.on('connection', async (wsClient, request) => {
    const url = request.url.split("?");
    const token = url[1] && url[1].split("=")[1] ? url[1].split("=")[1] : false;
    const user = await useUserForToken(token);
    const newAdding = {
      token: token,
      user: user,
      wsClient: wsClient
    };
    clients.add(newAdding);
    console.log("New User connected");
    
    wsClient.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
    wsClient.on('close', () => {
      clients.forEach(client => {
        if (client.wsClient === wsClient) {
          clients.delete(client);
        }
      });
      console.log('User disconnected');
    });
  });
};

module.exports = initWebSocket;
