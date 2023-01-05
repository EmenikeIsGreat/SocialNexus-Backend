const emit = require("./eventEmitter")

setInterval(()=>{
    emit("testing","helloWorld")
    console.log("active")
},2000)