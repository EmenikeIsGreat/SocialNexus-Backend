const mongoose = require("mongoose");
const user = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const message = require('../schemas/Message')


const path = require('path');

const coolPath = path.join(__dirname, '../.env')
require("dotenv").config({path:coolPath})



mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connected")
})
    .catch((error)=>{
        console.log(error);

    })


module.exports = async function createMessage(sender, recipient, body){
    try{
        let userMessage = await message.create({
            sender: sender,
            recipient:recipient,
            body: body,
        })
    
        console.log(userMessage)
        return true
    }
    catch(error){
        return error
    }
}

//createMessage("Emenike","62f7fdd597c2ceea6ad4595c","test")



