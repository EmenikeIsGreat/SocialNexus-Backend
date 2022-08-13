const axios = require('axios')
const bcrypt = require("bcryptjs")


const Json = {
    id:'62f6c7282be968830f9ab3f3',
    password:"OKNONO",
    newPassword:"OKNONO"
}



async function changePassword(Json){
    const res = await axios.post('http://localhost:3000/settings/changePassword',Json)
    //console.log(res.data)
}


//changePassword(Json)

async function test(){
    const res = await axios.get('http://localhost:3000/test')
    console.log(res)
}

//test()


