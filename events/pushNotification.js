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

http.listen(3000, () => {
  console.log('listening on *:3000');
});

const sendMessage = (message) => {
  io.emit('message', message);
}