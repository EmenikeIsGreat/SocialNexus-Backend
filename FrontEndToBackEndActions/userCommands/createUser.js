const axios = require('axios')
const bcrypt = require("bcryptjs")


const userJson = {
    userName:"firuegvirbviu",
    name:"33ofjnrjvnkejrver",
    phoneNumber:"3jbnljornvlojernve3",
    email:"3onvoernvoejrnvljer3",
    password:"3four3hfoi34rnfo4r"
}





async function createUser(userJson){
    console.log("Emenike")
    const res = await axios.post('http://35.172.193.5:8080/createUser',userJson)
    console.log(res.data)
}

createUser(userJson);


//createUser(userJson)

async function test(){
    const res = await axios.post('http://34.226.249.233:8080/createUser',userJson)
    console.log(res.data)
}

//test()


