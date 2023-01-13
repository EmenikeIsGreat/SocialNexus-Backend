const Assets = require('../../schemas/Assets')
const mongoose = require("mongoose");
const getUserBalance = require('./getUserBalance')
const chainQuery = require("../../Blockchain/wrappedFabConnect/query")
const portfolioEvaluation = require('../UserPortfolio/portfolioEvaluation')
const userPortfolio = require('../../schemas/userPortfolio')
const stringify = require('json-stringify-deterministic');


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

    const portEvaluation = await portfolioEvaluation(id)
    const evluation = portEvaluation.evaluation
    const userBalances = (await chainQuery("getUser",[id])).result

    const portfolio = await userPortfolio.findOne({userID:id});
    console.log("---------------")
    const assetKeys = Object.keys(userBalances)
    
    let balances = []

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

        let tempJSON = {
            deltas:deltas,
            name:assetName,
            dollarValue:portEvaluation.dollarValue[assetName]
        }
       
        balances.push(tempJSON)


        // userBalances[assetName].deltas = deltas;
        // userBalances[assetName].name = assetName;
        // userBalances[assetName].dollarValue = portEvaluation.dollarValue[assetName]
    }
    let returnVal = {
        portfolio,
        evaluation:evluation,
        balances: balances
    }

    //console.log(returnVal.balances)

    return returnVal


}

//getUsersPortfolio('63b79170871e180d114f80c9')