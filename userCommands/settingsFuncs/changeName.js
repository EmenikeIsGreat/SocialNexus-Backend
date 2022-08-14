const mongoose = require("mongoose");
const url = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const user = require('../../schemas/User')



mongoose.connect(url).then(()=>{
    console.log("connected")
})
    .catch((error)=>{
        console.log(error)

    })

module.exports = async function changeName(jsonInfo){
    
    let {id, firstName, lastName} = jsonInfo

    try{

        let user2 = await user.findById(id)

        user2.firstName = firstName;
        user2.lastName = lastName;
        
        let response = await user2.save();
        console.log(response)
        return jsonInfo

    }

   catch(error){
       console.log(error)
       return error
   }


}

//changeName('62c0eadc47ec21fd9e585023', {firstName:"ArinzeTheCoolOne",lastName:"OK"})

