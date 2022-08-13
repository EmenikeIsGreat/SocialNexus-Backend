const axios = require('axios')
const bcrypt = require("bcryptjs")


const userJson = {
    userName:"test123",
    name:"Emenike13",
    phoneNumber:"fake13",
    email:"lol13",
    password:"test13"
}



async function createUser(userJson){
    const res = await axios.post('http://localhost:3000/userProfile/createUser',userJson)
    console.log(res.data)
}



createUser(userJson)

async function test(){
    const res = await axios.get('http://localhost:3000/test')
    console.log(res)
}

//test()


