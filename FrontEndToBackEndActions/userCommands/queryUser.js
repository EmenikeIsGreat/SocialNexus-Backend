
const axios = require('axios')



let id = {id:"62f68a6150693c2e9d6bb4bd", queriedId: }

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

