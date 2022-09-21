const axios = require('axios')



const Json = {
    id:'62c0eadc47ec21fd9e585023',
    phoneNumber:"617"
}



async function changePhoneNumber(Json){
    const res = await axios.post('http://localhost:3000/settings/changePhoneNumber',Json)
    console.log(res.data)
}


//changePhoneNumber(Json)

async function test(){
    const res = await axios.get('http://localhost:3000/test')
    console.log(res)
}

//test()