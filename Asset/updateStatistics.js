const mongoose = require("mongoose");
const url = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const assets = require('../schemas/Assets')

mongoose.connect(url).then((result) =>{
    console.log("connected")
}).catch((error) =>{
    console.log(error)
})


// const AssetTracking = new mongoose.Schema({
    
//     Assets:[{
//         name:String,
//         creator:String,
//         launchTime: Number,
//         initialized:Boolean,

    
//         yearChart:[Number],
//         monthlyChart:[Number],
//         weeklyChart:[Number],
//         dailyChart:[Number],
//         minuteChart:[Number],

//         stats:{
//             dailyHigh: Number,
//             dailyLow:Number,
//             todaysVolume:Number,
//             averageVolume:Number,
//             highestPeakWeek:Number,
//             lowestPeakWeek:Number,
//             supply:Number,
//             popularity:Number,
//             marketCap:Number,
//             deltaWeek:Number,
//             deltaDay:Number,
//             deltaMonth:Number,
//             volumeAcrossFiveDays:[Number],
//             withinMinuteData:[Number]
//         },
     
//     }   ]

// },
    
//     { timestamps: true },
//)


async function updateStatistics(assetID, price, shares){

    let assetCollection = await assets.find()
    let id = assetCollection[0].id
    let assetsList = await assets.findById(id)
    let asset
    let position
    for(let i = 0; i < assetsList.Assets.length; i++){
        if(assetsList.Assets[i].id == assetID){
            asset = assetsList.Assets[i]
            //console.log(asset)
            position = i
            break
            
        }
    }
    
    //console.log(asset.stats.dailyHigh < price)

    asset.stats.dailyHigh  = asset.stats.dailyHigh < price ? price:asset.stats.dailyHigh
    asset.stats.dailyLow = asset.stats.dailyLow > price ? asset.stats.dailyLow = price:asset.stats.dailyLow
    asset.stats.todaysVolume += shares
    asset.stats.highestPeakWeek = asset.stats.highestPeakWeek < price ? asset.stats.highestPeakWeek = price:asset.stats.highestPeakWeek
    asset.stats.lowestPeakWeek = asset.stats.lowestPeakWeek > price ? asset.stats.lowestPeakWeek = price:
    asset.stats.marketCap = asset.stats.supply*price


   
    
    if(asset.monthlyChart.length == 0){
        asset.stats.deltaMonth = 0
    }

    if(asset.weeklyChart.length == 0){
        asset.stats.deltaWeek = 0
    }

    if(asset.dailyChart.length == 0){
        asset.stats.deltaDay = 0
    }

    asset.stats.withinMinuteData.push(price)
    
    
    assetsList[position] = asset
    let response = await assetsList.save()
    console.log(response.Assets[position])


}


let id1 = '62f02bafad3c3033cee62fd8'
let id2 = '62f02bb6ab04c72f4620a53e'
updateStatistics(id2,101,22)

