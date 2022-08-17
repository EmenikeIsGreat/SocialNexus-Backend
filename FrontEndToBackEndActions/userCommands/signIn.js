
const axios = require('axios')



let user = {email:"lol1344", password:'k'}

async function signIn(user){
    const res = await axios.post('http://localhost:5000/userProfile/signIn',user)
    console.log(res.data)
}


signIn(user)

async function test(){
    const res = await axios.get('http://localhost:3000/test')
    console.log(res)
}

//test()

