const axios = require('axios')


async function addOrders(){
    const res = await axios.post('http://localhost:3000/addOrder', {
                    order:{
                        orderID: "EmenikeOrderID",
                        UserID: "Emenike",
                        AssetID: "testCoin3",
                        OrderType: "Buy",
                        TokenAmount: 1,
                        strikePrice: 111.11,
                        Slippage: 0.01
                    }
              })
              console.log(res.data)
}

//addOrders()

async function getOrders(){
    const res = await axios.get('http://localhost:3000/sendMeOrders', {
    })
              console.log(res.data)
}


//getOrders()

async function empty(){
    const res = await axios.post('http://localhost:3000/empty', {
                    permissionToEmpty:true
              })
              console.log(res.data)
}

//empty()