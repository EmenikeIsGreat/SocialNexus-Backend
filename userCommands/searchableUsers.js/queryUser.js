const mongoose = require("mongoose");
const user = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const User = require('../../schemas/User')

mongoose.connect(user).then(()=>{
    console.log("connected")
})
    .catch((error)=>{
        console.log(error)

    })

module.exports = async function queryUser(jsonInfo){

    let {id} = jsonInfo
    try{

        let searchedUser = await User.findById(id)

        searchedUser.phoneNumber = null

        //console.log(searchedUser)
        return searchedUser

    }

   catch(error){
        console.log(error)
       return error
       
   }


}

//queryUser({id: '62f68a6150693c2e9d6bb4bd'})

