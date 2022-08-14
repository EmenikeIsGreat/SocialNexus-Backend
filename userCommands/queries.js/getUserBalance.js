const query = require('../../Blockchain/wrappedFabConnect/query')


module.exports = async function getUserBalance(userID){
    let {id} = userID
    let balance = await query("Emenike", "test", "contract", "getUser", [id])
    return balance
}

//getUserBalance('Emenike')