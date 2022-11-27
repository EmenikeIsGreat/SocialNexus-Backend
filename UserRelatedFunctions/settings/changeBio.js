const mongoose = require("mongoose");
const user = require('../../schemas/User')


const path = require('path');

const coolPath = path.join(__dirname, '../.env')
require("dotenv").config({path:coolPath})

//console.log(process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connected")
})
    .catch((error)=>{
        console.log(error);

    })
module.exports = async function changeBio(jsonInfo){
    
    let {id, newBio} = jsonInfo

    console.log(id + " " + newBio)

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

