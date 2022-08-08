
const query = require('../../Blockchain/wrappedFabConnect/query');

async function checkTxStatus(txID){
    try{
        let value = await query("Emenike", "test", "contract", "getOrder", [txID])
        console.log(value.result)
        return value.result
        
    }
    catch(error){
        console.log(error)
        return error
    }

}

checkTxStatus("NoID")


