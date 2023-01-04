const query = require('../../Blockchain/wrappedFabConnect/query')


module.exports = async function getUserBalance(userID){
    let {id} = userID
    let balance = await query("getBalance", [id])

    //get users portfolio from data base
    //construct a forloop that iterates through the portfolio and update the asset balance with the addition of the deltas
    //set that equal to balance and send it
    console.log(balance)
    return balance
}

//getUserBalance({id:"Arinze"})

// query( "getUser", ["Emenike"]).then((data)=>{
//   console.log(data)
// })
