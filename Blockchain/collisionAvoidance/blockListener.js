const chainInfo = require('../wrappedFabConnect/chainInfo')
const axios = require('axios')
//chainInfo("Emenike")
async function newBlockCycle(){
    let value = await chainInfo("Emenike")
    let oldBlock = value
    while(true){
        value = await chainInfo("Emenike")
        if(value != oldBlock){
            let oldBlock = value
            console.log("new block has been created: block " + value )
            await empty()
        }
        oldBlock = value
        console.log(value)
    }

}


async function empty(){
    const res = await axios.post('http://localhost:3000/empty', {
                    permissionToEmpty:true
              })
              console.log(res.data)
}

newBlockCycle()