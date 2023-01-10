const express = require('express')
const router = express.Router()

const stringify  = require('json-stringify-deterministic');
const transaction = require('../Blockchain/wrappedFabConnect/transactions')
const hash = require('hash')
const conversion = require('../AssetFunctions/conversion')
const eventHandler = require('../events/eventHandler')
const ExternalAccountTransaction = require('../UserRelatedFunctions/BlockchainCommands/ExternalAccountTransfer')
const getTxFromID = require('../UserRelatedFunctions/get/getTxFromID')
//let myHash = new hash()


//const MegaHash = require('megahash');
//var hash = new MegaHash();

/*
myHash.set('a', [1,2,3,4,5,6])
myHash.set('b', [1,2,3,4,5,6])
myHash.set('c', [1,2,3,4,5,6])
myHash.get('a').push(8)
//console.log(myHash)
//myHash.del('a')
console.log(myHash.get('a'))
//myHash.get('a') // undefined

myHash.forEach(function iterator (value, key) {
    console.log(key + ":" + value)
})
*/


let BuySellOrderHash = new hash()
let BidOrderHash = new hash()
let ExternalTxList = []
let collect = false

// can not add deposit and add order that edits two states with the same key
router.post('/empty',(req,res) =>{

    if(req.body.permissionToEmpty){
        // dump the array

        BuySellOrderHash.forEach(function iterator (value, key) {
                        // use test to see if it works then execute order
            //signer, channel, contract, func, args, sync
            //transaction("Emenike", "test", "contract", "testing",[key, stringify(value)], false)
            BuySellOrderHash.del(key)
        })

        BidOrderHash.forEach(function iterator (value, key) {
                        // use test to see if it works then execute order
            //signer, channel, contract, func, args, sync
            //transaction("Emenike", "test", "contract", "testing",[key, stringify(value)], false)
            BidOrderHash.del(key)
        })

        // set collect equal to 2
        //transaction("ExternalTx",[stringify(ExternalTx),collect])
        //set collect  = false

        res.send("orders sent")

    }
    else{
        res.send("permission not granted")
    }
})

// adds order to the hashtable

//orderId, UserID, assetID, OrderType, TokenAmount, strikePrices, Slippage


// let sampleOrderBuySell = {
//     orderID: "EmenikeOrderID",
//     userID: "Emenike",
//     assetID: "testCoin",
//     orderType: "Buy",
//     tokenAmount: 1,
//     strikePrice: 111.11,
//     slippage: 0.01
// }


// let sampleOrderBid = {
//     orderID: "EmenikeOrderID",
//     userID: "Emenike",
//     assetID: "testCoin",
//     orderType: "Bid",
//     usdsn: 20
// }


router.post('/addOrder', (req,res) =>{
    let order = req.body
    console.log("------------recieved Order------------")
    console.log(order)
    if(order.orderType == "Bid"){
    
        if(BidOrderHash.get(order.assetID) == undefined){
            BidOrderHash.set(order.assetID, [])
    
            //transaction("Emenike", "test", "contract", "userBid",[order.assetID, stringify([order])], false)
    
        }
    
        else{
            BidOrderHash.get(order.assetID).push(order)
        }
    
        res.send("order recieved: " + order)
    }

    else{
        if(BuySellOrderHash.get(order.assetID) == undefined){
            BuySellOrderHash.set(order.assetID, [])
    
            //transaction("Emenike", "test", "contract", "executeOrder",[order.assetID, stringify([order])], false)
    
        }
    
        else{
            BuySellOrderHash.get(order.assetID).push(order)
        }
    
        res.send({orderRecieved:true})
    }

    
})



// testing purposes
router.get('/sendMeOrders', (req,res) =>{
    
    res.send({BuySellOrders:BuySellOrderHash, BidOrder: BidOrderHash})
    
})

router.get('/conversion', async (req,res) =>{
    let {assetID,txStatus,amount} = req.query.data

    let response = await conversion(assetID, txStatus, amount)
    res.send(response)
    
})


// need to check on this to see if it works
router.post('/HandleEvent', async (req,res) =>{
    console.log("Handeling event")
    console.log("-------------PROCESSING BLOCKCHAIN EVENTS--------------")
    await eventHandler(req.body)
    res.end()
})

router.post('/AddExternalTx', async (req,res) =>{

    // console.log("-------Processing Order--------")
    // console.log(req.body)
    // console.log("-------Processing Order--------")
    let {txid,id,amount,deposit} = req.body
    ExternalTxList.push(req.body)
    let response = await ExternalAccountTransaction(txid, id, amount, deposit)
    res.send(response)
    res.end()
})

router.get('/getTxFromID', async (req,res) =>{

    let {id} = req.body
    let response = await getTxFromID(id)
    console.log(response)
    //res.send(response)
    res.send({sample:"test"})
    res.end()
})




module.exports = router
