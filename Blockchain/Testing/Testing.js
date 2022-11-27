const tx = require('../../Blockchain/wrappedFabConnect/transactions')

async function createUser(id){
    let trasnaction = await tx("createUser",[id])
    console.log(trasnaction)
    return trasnaction
}

createUser("Emenike")