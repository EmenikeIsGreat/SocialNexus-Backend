const axios = require('axios')
const bcrypt = require("bcryptjs")


const userJson = {
    userName:"test1234522",
    name:"Emenike132245",
    phoneNumber:"fake221345",
    email:"lol1344",
    password:"k"
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


