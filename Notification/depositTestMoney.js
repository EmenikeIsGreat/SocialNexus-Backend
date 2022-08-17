

const mongoose = require("mongoose");
const user = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const User = require('../schemas/User')
const stringify  = require('json-stringify-deterministic');
const transaction = require('../Blockchain/wrappedFabConnect/transactions')





  


mongoose.connect(user).then(()=>{
    console.log("connected")
})
    .catch((error)=>{
        console.log(error)

    })




async function depositTestMoney(){
        //Where User is you mongoose user model
        let allUsers = await User.find()
        allUsers.map(user => {
                console.log(user.id)
                let response = await transaction("Emenike", "test", "contract", "deposit", [user.id, stringify(amount)], true)
            })
    }




depositTestMoney(100)