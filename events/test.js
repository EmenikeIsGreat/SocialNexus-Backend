const emit = require("./pushNotification")

setInterval(()=>{
    emit("testing","helloWorld")
    console.log("active")
},2000)