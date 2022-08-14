const mongoose = require("mongoose");
const url = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const user = require('../../schemas/User')



mongoose.connect(url).then(()=>{
    console.log("connected")
})
    .catch((error)=>{
        console.log(error)

    })

module.exports = async function changeBio(jsonInfo){
    
    let {id, newBio} = jsonInfo

    try{

        let user2 = await user.findById(id)
        console.log(user2)

        user2.Bio = newBio

        
        let response = await user2.save();
        console.log(response)
        return jsonInfo

    }

   catch(error){
       console.log(error)
       return error
   }


}

//changeBio({id: '62f7fdd597c2ceea6ad4595c', newBio:"Test Bio"})

