const mongoose = require("mongoose");
const url = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const user = require('../../schemas/User')
const checkPhoneNumberExist = require('./checkPhoneNumberExist')


mongoose.connect(url).then(()=>{
    console.log("connected")
})
    .catch((error)=>{
        console.log(error)

    })

async function changeUserName(userID, phoneNumber){

    try{
        let check = await checkPhoneNumberExist(phoneNumber)
        
        if(check){
            console.log("exist")
            return false
        }
    
        else{
            let user2 = await user.findById(userID)
            console.log(user2)

            user2.phoneNumber = phoneNumber;
            await user2.save();
            return true
        }
    }

   catch(error){
       console.log(error)
       return error
   }


}

changeUserName('62c07a866e540038583133d1', '61728696102')

