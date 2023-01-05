const query = require('../../Blockchain/wrappedFabConnect/query')
const Asset = require('../../schemas/Assets')
const stringify = require('json-stringify-deterministic');


async function getAllPrices(){
    let returnVal = await Asset.find().select('name -_id');
    
    let assetNames = []

    let priceJson = {}
    for(i = 0; i < returnVal.length; i++){
        assetNames.push(returnVal[i].name)
    }
    
    let prices = await query('getPrice',[stringify(assetNames)])
    prices = prices.result
    
    for(i = 0; i < prices.length; i++){
        priceJson[prices[i].asset] = prices[i].price
    }

    //console.log(priceJson)
    return priceJson
}



module.exports = async function calculateTotalValOfUsersPortfolio(userID){

    let prices = await getAllPrices();
    let usersBalance = await query('getUser', [userID])
    usersBalance = usersBalance.result
 
    
    let totalAssetEvalInUSD = 0

    //testing
    
    // let prices = [{asset:"LP", price:40},{asset:"JP", price:40}, 
    //             {asset:"kP", price:40},{asset:"yP", price:40}, 
    //             {asset:"rP", price:40}, {asset:"fP", price:40}, 
    //             {asset:"jP", price:40}]
    


    let usersAsset = Object.keys(usersBalance)

    for(let i = 0; i < Object.keys(usersBalance).length; i++){
        
        if(usersAsset[i] == "USDSH"){
            continue;
        }

        if(Object.keys(usersBalance[usersAsset[i]]) == 'Bid'){
            continue
        }



        let tokenShare = parseFloat(usersBalance[usersAsset[i]].balance)

        let assetPPS = parseFloat(prices[usersAsset[i]])
   
        let totalValuationOfAssetInUSD = tokenShare*assetPPS
        totalAssetEvalInUSD += totalValuationOfAssetInUSD


       
    }

    return totalAssetEvalInUSD
}
