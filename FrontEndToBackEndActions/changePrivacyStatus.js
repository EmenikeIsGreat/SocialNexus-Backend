const axios = require('axios')



const Json = {
    id:'62f7ce91c919f2f9862217d3',
    privacyStatus:false
}



async function changePrivacyStatus(Json){
    const res = await axios.post('http://localhost:3000/settings/changePrivacyStatus',Json)
    console.log(res.data)
}


changePrivacyStatus(Json)

async function test(){
    const res = await axios.get('http://localhost:3000/test')
    console.log(res)
}

//test()