const mongoose = require("mongoose");
const url = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const user = require('../schemas/User')
const checkIfEmailExist = require('./checkEmailExist')


mongoose.connect(url).then(()=>{
    console.log("connected")
})
    .catch((error)=>{
        console.log(error)

    })

module.exports = async function changeEmail(jsonInfo){

    let {id, email} = jsonInfo
    console.log(jsonInfo)
    try{
        let check = await checkIfEmailExist(email)
        
        if(check){
            console.log("exist")
            return false
        }
    
        else{
            let user2 = await user.findById(id)
            console.log(user2)

            user2.email = email;
            await user2.save();
            return jsonInfo
        }
    }

   catch(error){
       console.log(error)
       return error
   }


}

//changeEmail({userID: '62c0eadc47ec21fd9e585023', email: 'EmenikeCool100000000000000000000000000000'})

