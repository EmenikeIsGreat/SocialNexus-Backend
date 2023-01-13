const Assets = require('../../schemas/Assets')
const mongoose = require("mongoose");
const getUserBalance = require('./getUserBalance')
const chainQuery = require("../../Blockchain/wrappedFabConnect/query")
const portfolioEvaluation = require('../UserPortfolio/portfolioEvaluation')
const userPortfolio = require('../../schemas/userPortfolio')

const path = require('path');
const { text } = require('express');

const coolPath = path.join(__dirname, '../.env')
require("dotenv").config({path:coolPath})

//console.log(process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connected")
})
    .catch((error)=>{
        console.log(error);

    })

module.exports = async function getUsersPortfolio(id){

    const evluation = await portfolioEvaluation(id)
    
    const userBalances = (await chainQuery("getUser",[id])).result
    const portfolio = await userPortfolio.findOne({userID:id});
    console.log("---------------")
    const assetKeys = Object.keys(userBalances)
    

    for(i = 0; i < assetKeys.length; i++){
        if(assetKeys[i] == "USDSH"){
            continue;
        }
        let assetName = assetKeys[i];
        let assetJSON = await Assets.findOne({name:assetName})
        
        let deltas = {
            deltaDay:assetJSON.stats.deltaDay,
            deltaWeek:assetJSON.stats.deltaWeek,
            deltaMonth:assetJSON.stats.deltaMonth
        }

        userBalances[assetName].deltas = deltas;
    }
    let returnVal = {
        portfolio,
        evaluation:evluation,
        userBalances
    }

    console.log(returnVal.userBalances)

    return returnVal


}

//getUsersPortfolio('63b79170871e180d114f80c9')