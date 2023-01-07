const socketIO = require("socket.io-client");


const socket = socketIO.connect("http://44.203.95.162:8081");
socket.on("testing", (...args) => {
    console.log(...args);
  });