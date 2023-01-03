
const axios = require('axios')


let json = {id:"63b349f21aa5830d1301421e",amount:2,initialRender:true,date:"2023-01-03T03:55:19.597Z"}

async function getTx(json){
    const res = await axios.get('http://localhost:8080/user/getMessages',{params:json})
    console.log(res.data)
}


getTx(json)

async function test(){
    const res = await axios.get('http://localhost:8080/test')
    console.log(res)
}

//test()
