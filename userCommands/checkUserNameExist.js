const mongoose = require("mongoose");
const url = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const user = require('../schemas/User')



module.exports = async function checkIfUserNameExist(userName){
    const doesUserNameExist = await user.exists({userName:userName})
    if(doesUserNameExist == null){
        return false
    }

    else{
        return true
    }
}