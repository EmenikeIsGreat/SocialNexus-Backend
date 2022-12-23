const axios = require('axios')
const path = require('path');



const coolPath = path.join(__dirname, '../.env')
require("dotenv").config({path:coolPath})


const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(8080, () => {
  console.log('listening on *:8080');
});

const sendMessage = (message) => {
  io.emit('message', message);
}