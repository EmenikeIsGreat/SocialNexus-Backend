const emit = require("./index")

setInterval(()=>{
    emit("testing","helloWorld")
    console.log("active")
},2000)