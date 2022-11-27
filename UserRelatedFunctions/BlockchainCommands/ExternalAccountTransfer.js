const tx = require('../../Blockchain/wrappedFabConnect/transactions')
const stringify  = require('json-stringify-deterministic');


async function ExternalAccountTransaction(id,amount,withdraw){   
    
    amount = stringify(amount)

    if(withdraw){
        withdraw = true
    }

    else{
        withdraw = false
    }

    if(!withdraw){
        let trasnaction = await tx('deposit',[id,amount,"true"])
        return trasnaction
    }

    else{

        let trasnaction = await tx("withdraw",["see",id,amount,"true"])
        return trasnaction
    }
}

ExternalAccountTransaction("Emenike",0.001,true)