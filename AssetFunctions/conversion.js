

// this function allows user to get conversion of the amount of an asset they would get back
//EX: 1 SN coin => 100 LoganPaulCoins

const query = require('../Blockchain/wrappedFabConnect/query')

module.exports = async function conversion(assetID, txStatus, amount){
    let response = await query('test_LP_Math',[assetID,amount,txStatus,'false'])
    response = response.result
    return response.payment
}