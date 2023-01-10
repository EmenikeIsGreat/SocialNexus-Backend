const query = require('../../Blockchain/wrappedFabConnect/query')


module.exports = async function getTxFromID(id){
    
    console.log("checkpoint1")
    let value = await query("get", [id])
    
    return value.result


}
//getTxFromID("faketransid")