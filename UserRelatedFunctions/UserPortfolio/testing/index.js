const { stringify } = require("json-stringify-deterministic/lib/defaults")

transaction = require("../../../Blockchain/wrappedFabConnect/transactions")
query = require('../../../Blockchain/wrappedFabConnect/query')

// create User


//transaction('createUser',["63a8c5d2e47fb161d4472337"])
//transaction('createUser',["Arinze"])



//deposit money in User's account


//transaction('deposit',["63a8c5d2e47fb161d4472337","100000","true"])
//transaction('createUser',["Arinze","100000","true"])



//create Asset

//transaction('createAsset',["ArinzeAsset","Arinze"])


/*
query("getAsset", ["63a8c5d2e47fb161d4472337"]).then((data)=>{
    console.log(data.result)
})
*/








//Bid on Asset

/*
let orders = [{
    id:"1",
    userID:"Emenike",
    assetID:"ArinzeAsset",
    usdsn:200
}]

transaction('userBid',["ArinzeAsset",stringify(orders)])
*/

// intialize Asset
//transaction('initalizeAssets',["ArinzeAsset"])


// testing getPrice\



let assetNames = ["ArinzeAsset"]

/*
query("getPrice", [stringify(assetNames)]).then((data)=>{
    console.log(data.result[0])
})
*/








