
const axios = require('axios')



let id = {id:"62f68a6150693c2e9d6bb4bd", queriedId: '62f67c52c7ef61f24b5b1888' }

async function queryUser(id){
    const res = await axios.post('http://localhost:3000/userProfile/queryUser',id)
    console.log(res.data)
}


queryUser(id)

async function test(){
    const res = await axios.get('http://localhost:3000/test')
    console.log(res)
}

//test()

