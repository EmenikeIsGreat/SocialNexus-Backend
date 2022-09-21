const mongoose = require("mongoose");
const User = require('../schemas/User')

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


async function testing(){
    let result = await User.create({

        userName:"test1234522",
        name:"Emenike132245",
        phoneNumber:"fake221345",
        email:"lol1344",
        password:"k"

    })
    console.log(result);
}

//testing()