const mongoose = require("mongoose");
const url = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const user = require('../../schemas/User')


module.exports = async function checkIfEmailExist(email){
    const doesEmailExit = await user.exists({email:email})
    console.log(doesEmailExit)
    if(doesEmailExit == null){
        return false
    }

    else{
        return true
    }

}