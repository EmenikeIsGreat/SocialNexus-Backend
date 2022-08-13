const axios = require('axios')
const bcrypt = require("bcryptjs")


const userJson = {
    userName:"test12345",
    name:"Emenike1345",
    phoneNumber:"fake1345",
    email:"lol1345",
    password:"test1345"
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


