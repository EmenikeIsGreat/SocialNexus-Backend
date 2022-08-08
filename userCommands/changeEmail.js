const mongoose = require("mongoose");
const url = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const user = require('../../schemas/User')
const checkIfEmailExist = require('./checkEmailExist')


mongoose.connect(url).then(()=>{
    console.log("connected")
})
    .catch((error)=>{
        console.log(error)

    })

async function changeEmail(userID, email){

    try{
        let check = await checkIfEmailExist(email)
        
        if(check){
            return false
        }
    
        else{
            let user2 = await user.findById(userID)
            console.log(user2)

            user2.email = email;
            await user2.save();
            return true
        }
    }

   catch(error){
       console.log(error)
       return error
   }


}

//changeEmail('62c07a866e540038583133d1', 'emenike@email2')

