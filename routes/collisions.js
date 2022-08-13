const express = require('express')
const router = express.Router()

const stringify  = require('json-stringify-deterministic');
const transaction = require('../Blockchain/wrappedFabConnect/transactions')
const hash = require('hash')




let myHash = new hash()


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


let orderHash = new hash()

router.post('/empty',(req,res) =>{

    if(req.body.permissionToEmpty){
        // dump the array

        orderHash.forEach(function iterator (value, key) {
                        // use test to see if it works then execute order
            //signer, channel, contract, func, args, sync
            transaction("Emenike", "test", "contract", "testing",[key, stringify(value)], false)
            orderHash.del(key)
        })

        res.send("orders sent")

    }
    else{
        res.send("permission not granted")
    }
})

// adds order to the hashtable

//orderId, UserID, AssetID, OrderType, TokenAmount, strikePrices, Slippage
let sampleOrder = {
    orderID: "EmenikeOrderID",
    UserID: "Emenike",
    AssetID: "testCoin",
    OrderType: "Buy",
    TokenAmount: 1,
    strikePrice: 111.11,
    Slippage: 0.01
}


router.post('/addOrder', (req,res) =>{
    let order = req.body.order

    if(orderHash.get(order.AssetID) == undefined){
        orderHash.set(order.AssetID, [])
        transaction("Emenike", "test", "contract", "testing",[order.AssetID, stringify([order])], false)
    }

    else{
        orderHash.get(order.AssetID).push(order)
    }

    res.send("order recieved: " + order)
    
})

router.get('/sendMeOrders', (req,res) =>{
    
    res.send(orderHash)
    
})


module.exports = router
