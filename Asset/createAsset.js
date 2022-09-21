
const mongoose = require("mongoose");
const url = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const transaction = require('../Blockchain/wrappedFabConnect/transactions')
const user = require('../schemas/User')
const assets = require('../schemas/Assets')


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
const tokenSuppyly = 10000
function initAssetStats(userID, launchTime){
    let Asset = {
        creator:userID,
        initialized:false,
        launchTime: launchTime,

    
        yearChart:[],
        monthlyChart:[],
        weeklyChart:[],
        dailyChart:[],
        minuteChart:[],

        stats:{
            dailyHigh: 0,
            dailyLow:0,
            todaysVolume:100,
            averageVolume:0,
            highestPeakWeek:0,
            lowestPeakWeek:0,
            supply:tokenSuppyly,
            popularity:0,
            marketCap:0,
            withinMinuteData:[],
            volumeAcrossFiveDays:[],

        },

    }   
    //console.log(Asset)

    return Asset

}


async function createAsset(userID, launchTime){

    try{

        let addAsset = await assets.find()
    
 
        addAsset = addAsset[0]
        //console.log(addAsset)


        addAsset.Assets.push(initAssetStats(userID, launchTime))
        let response = await addAsset.save()
        console.log('----------------------------------')
        console.log(response.Assets[response.Assets.length-1])
        console.log('----------------------------------')

        let AssetID = response.Assets[response.Assets.length-1].id
        let userJson = await user.findById(userID)
        userJson.Asset = AssetID
        let returnUser = await userJson.save()
        //console.log(returnUser)

        // //transaction(userID, AssetID, "contract", "createAsset", [AssetID, userID], true)
        // return true
        console.log('success')
    }

    catch(error){
        console.log(error)
        return error
    }

}

createAsset('62c0eadc47ec21fd9e585023',30)


// testing
async function createAssetCollection(){
    let Asset = await assets.create({

    })

    console.log(Asset)
}

//createAssetCollection()


