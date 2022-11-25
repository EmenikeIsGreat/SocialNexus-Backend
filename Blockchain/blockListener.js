/*

this scans the block chain to see when a new block is created


*/




const chainInfo = require('./wrappedFabConnect/chainInfo')
const axios = require('axios')
//chainInfo("Emenike")


//old block
let oldBlock = await chainInfo("Emenike")



// checks when new block is created
async function checkForNewBlock(){
    let value = await chainInfo("Emenike")

    if(value != oldBlock){
        console.log("new block has been created: block " + value )
        oldBlock = value
        await empty()
    }
        oldBlock = value
        console.log(value)

}

// sends command to the server to send all orders to the blockchain
async function empty(){
    const res = await axios.post('http://localhost:3000/empty', {
                    permissionToEmpty:true
              })
              console.log(res.data)
}



// calls x number of seconds to see when new block is created
setInterval(async ()=>{ 
    await checkForNewBlock()
}, 1000);
