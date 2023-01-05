const http = require('http');
const socket = require("socket.io")
const httpServer = http.createServer();



const Server = require("socket.io")

const io = new Server.Server(httpServer, {
});


module.exports = function emitEvent(topic,message){
   io.sockets.emit(topic, message);
}

httpServer.listen(8080);   