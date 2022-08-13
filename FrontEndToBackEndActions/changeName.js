const axios = require('axios')



const nameJson = {
    id:'62c0eadc47ec21fd9e585023',
    firstName:"Joe",
    lastName:"Shiesty"
}



async function changeName(nameJson){
    const res = await axios.post('http://localhost:3000/settings/changeName',nameJson)
    console.log(res.data)
}


changeName(nameJson)

async function test(){
    const res = await axios.get('http://localhost:3000/test')
    console.log(res)
}

//test()