const http = require('http');
const socket = require("socket.io")
const httpServer = http.createServer();



const Server = require("socket.io")

const io = new Server.Server(httpServer, {
});


module.exports = function emitEvent(topic,message){
   let response = io.sockets.emit(topic, message);
   console.log(response)
}

httpServer.listen(8081);   