const tx = require('../../Blockchain/wrappedFabConnect/transactions')
const stringify  = require('json-stringify-deterministic');


module.exports = async function ExternalAccountTransaction(id,amount,withdraw){   
    
    amount = stringify(amount)

    //console.log(parseFloat(amount) + 10000)

    if(!withdraw){
        let trasnaction = await tx('deposit',[id,amount,"true"])
        return trasnaction
    }

    else{

        let trasnaction = await tx("withdraw",[id,amount,"true"])
        return trasnaction
    }
}

//ExternalAccountTransaction("Emenike",10000000000000,true)
