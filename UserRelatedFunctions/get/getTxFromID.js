const query = require('../../Blockchain/wrappedFabConnect/query')


module.exports = async function getTxFromID(id){

    let value = await query("get", [id])
    console.log(value.result)
    return value.result


}
//getTxFromID("EmenikeTXFROMID")