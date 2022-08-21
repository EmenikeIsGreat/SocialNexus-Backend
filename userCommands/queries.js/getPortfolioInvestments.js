const User_Portfolio = require('../../schemas/userPortfolio')
const mongoose = require("mongoose");
const url = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const getUserBalance = require('./getUserBalance')

mongoose.connect(url).then((result) =>{
    console.log("connected")
}).catch((error) =>{
    console.log(error)
})

module.exports = async function getUsersPortfolioOrAndBalance(request){
    let {id, renderAll} = request

    const response = await User_Portfolio.find({userID:id})
    if(renderAll){
        const balance = await getUserBalance({id:id})
        
        const finalJson = {response: response, balance:balance, all:true}
        
        //console.log(finalJson)
        return finalJson
    }

    else{        
        const finalJson = {response: response, all:false}
        
        //console.log(finalJson)
        return finalJson
    }

}

//getUsersPortfoliOorAndBalance({id:'Emenike', renderAll:true})