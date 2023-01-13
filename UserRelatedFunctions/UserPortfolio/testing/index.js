const { stringify } = require("json-stringify-deterministic/lib/defaults")

transaction = require("../../../Blockchain/wrappedFabConnect/transactions")
query = require('../../../Blockchain/wrappedFabConnect/query')

// create User


//transaction('createUser',["63b79170871e180d114f80c9"])
// transaction('createUser',["Arinze"])
// transaction('createUser',["Samar"])
// transaction('createUser',["Adanna"])
// transaction('createUser',["Izunna"])
// transaction('createUser',["Rav"])




//deposit money in User's account


//transaction('deposit',["sample","63b79170871e180d114f80c9","1000000000000","true"])
//transaction('createUser',["Rav"])




//create Asset

//transaction('createAsset',["Kanye","Arinze"])


/*
query("getAsset", ["63a8c5d2e47fb161d4472337"]).then((data)=>{
    console.log(data.result)
})
*/








//Bid on Asset


let sampleBid = [{
  id:"test",
  userID:"63b79170871e180d114f80c9",
  assetID:"SumSum",
  usdsn:"10",
  txID:"test"
}]



//transaction('userBid',["Izzy",stringify(sampleBid)])
//transaction('userBid',["NZ",stringify(sampleBid)])
//transaction('userBid',["SumSum",stringify(sampleBid)])
//transaction('userBid',["Ravetron",stringify(sampleBid)])
//transaction('userBid',["Adaze",stringify(sampleBid)])


// intialize Asset
//transaction('initalizeAssets',["Izzy"])
//transaction('initalizeAssets',["Adaze"])
//transaction('initalizeAssets',["SumSum"])
// transaction('initalizeAssets',["Ravetron"])
// transaction('initalizeAssets',["NZ"])


// testing getPrice



let assetNames = [ 'NZ', 'Ravetron', 'Izzy', 'Adaze', 'SumSum' ]


// query("getPrice", [stringify(assetNames)]).then((data)=>{
//     console.log(data.result)
// })



// query("getAsset", ["SumSum"]).then((data)=>{
//     console.log(data.result)
// })
// query("getAsset", ["Ravetron"]).then((data)=>{
//     console.log(data.result)
// })

// query("getAsset", ["NZ"]).then((data)=>{
//     console.log(data.result)
// })

// query("getAsset", ["Izzy"]).then((data)=>{
//     console.log(data.result)
// })

// query("getAsset", ["Adaeze"]).then((data)=>{
//     console.log(data.result)
// })


// query("getUser", ["NZ"]).then((data)=>{
//     console.log(data.result)
// })









