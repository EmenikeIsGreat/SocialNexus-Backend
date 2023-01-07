const http = require('http');
const socket = require("socket.io")
const httpServer = http.createServer();



const Server = require("socket.io")

const io = new Server.Server(httpServer, {
});


module.exports = function emitEvent(topic,message){
   console.log("emitting the event")
   let response = io.sockets.emit(topic, message);
   //console.log(response)
}

httpServer.listen(8080);   