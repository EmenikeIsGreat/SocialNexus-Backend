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
    console.log("EMenike")
    const res = await axios.post('http://localhost:8080/createUser',userJson)
    console.log(res.data)
}



createUser(userJson)

// async function test(){
//     const res = await axios.post('http://44.204.176.1:8080/createuser')
//     console.log(res)
// }

// test()


