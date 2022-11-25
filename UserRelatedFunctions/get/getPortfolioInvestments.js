const User_Portfolio = require('../../schemas/userPortfolio')
const mongoose = require("mongoose");
const getUserBalance = require('./getUserBalance')


const path = require('path');

const coolPath = path.join(__dirname, '../.env')
require("dotenv").config({path:coolPath})

//console.log(process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connected")
})
    .catch((error)=>{
        console.log(error);

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