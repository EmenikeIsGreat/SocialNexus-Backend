const http = require('http');
const socket = require("socket.io")
const httpServer = http.createServer();



const Server = require("socket.io")

const io = new Server.Server(httpServer, {
});

setInterval(()=>{
   io.sockets.emit("hi", "everyone");
   console.log("Emenike")
},2000)


httpServer.listen(8080);