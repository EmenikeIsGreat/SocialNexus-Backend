
const axios = require('axios')


let jsonInfo = {id:'62b750b69e2542d58f9721c6', amount:100, intialRender:true, date:null}

async function getTx(jsonInfo){
    const res = await axios.post('http://localhost:3000/userProfile/getTx',jsonInfo)
    console.log(res.data)
}


getTx(jsonInfo)

async function test(){
    const res = await axios.get('http://localhost:3000/test')
    console.log(res)
}

//test()
