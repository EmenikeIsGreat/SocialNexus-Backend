
const axios = require('axios')
const bcrypt = require("bcryptjs")


let sampleOrderBuySell = {
    orderID: "EmenikeOrderID",
    userID: "Emenike",
    assetID: "testCoin",
    orderType: "Buy",
    tokenAmount: 1,
    strikePrice: 111.11,
    slippage: 0.01
}


let sampleOrderBid = {
    orderID: "EmenikeOrderID",
    UserID: "Emenike",
    assetID: "testCoin",
    orderType: "Bid",
    usdsn: 20
}

async function sendOrder(jsonInfo){
    const res = await axios.post('http://localhost:3000/processOrder/addOrder',jsonInfo)
    console.log(res.data)
}


//sendOrder(sampleOrderBuySell)

async function test(){
    const res = await axios.get('http://localhost:3000/test')
    console.log(res)
}

//test()

async function getOrdersTest(){
    const res = await axios.get('http://localhost:3000/processOrder/sendMeOrders')
    console.log(res.data)
}

//getOrdersTest()


