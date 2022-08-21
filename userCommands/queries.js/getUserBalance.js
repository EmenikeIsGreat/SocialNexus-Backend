const query = require('../../Blockchain/wrappedFabConnect/query')


module.exports = async function getUserBalance(userID){
    let {id} = userID
    let balance = await query("getUser", [id])

    return balance
}

//getUserBalance({id:"Emenike"})

// query( "getUser", ["Emenike"]).then((data)=>{
//   console.log(data)
// })