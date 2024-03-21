const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    console.log('A client connected');
  
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
  
      // Broadcast to all clients
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
  
    // Handle error to prevent crashing
    ws.on('error', function error(err) {
      console.error('WebSocket error observed: ', err);
    });
  
    // Log when a client disconnects
    ws.on('close', function close() {
      console.log('A client disconnected');
    });
});

server.listen(8084, function listening() {
  console.log('Server is running on http://localhost:8084');
});


