const emit = require("./pushNotification")

setInterval(()=>{
    emit("testing","helloWorld")
},2000)