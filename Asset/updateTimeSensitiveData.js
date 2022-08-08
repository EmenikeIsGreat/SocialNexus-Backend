const mongoose = require("mongoose");
const url = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const assets = require('../schemas/Assets')

mongoose.connect(url).then((result) =>{
    console.log("connected")
}).catch((error) =>{
    console.log(error)
})




const AssetTracking = new mongoose.Schema({
    
    Assets:[{
        name:String,
        creator:String,
        launchTime: Number,
        initialized:Boolean,

    
        yearChart:[Number],
        monthlyChart:[Number],
        weeklyChart:[Number],
        dailyChart:[Number],
        minuteChart:[Number],

        stats:{
            dailyHigh: Number,
            dailyLow:Number,
            todaysVolume:Number,
            averageVolume:Number,
            highestPeakWeek:Number,
            lowestPeakWeek:Number,
            supply:Number,
            popularity:Number,
            marketCap:Number,
            deltaWeek:Number,
            deltaDay:Number,
            deltaMonth:Number,
            volumeAcrossFiveDays:[Number],
            withinMinuteData:[Number]
        },
     
    }   ]

},
    
    { timestamps: true },
)

function refreshMinuteChart(asset){

    let lastElement = asset.stats.withinMinuteData[asset.stats.withinMinuteData.length-1]
    if(asset.minuteChart.length < 60){
        asset.minuteChart.push(lastElement)
        console.log('less than')
    }

    else{
        asset.minuteChart.shift()
        asset.minuteChart.push(lastElement)
        console.log('greater than')
    }

    asset.stats.withinMinuteData = [lastElement]
    //console.log(asset)
    return asset

}

function refreshDailyChart(asset){

    let lastElement = asset.stats.withinMinuteData[asset.stats.withinMinuteData.length-1]

    if(asset.dailyChart.length < 24){
        asset.dailyChart.push(lastElement)
        lastElement = []
        console.log('less than')
    }

    else{
        asset.dailyChart.shift()
        asset.dailyChart.push(lastElement)
        lastElement = []
        console.log('greater than')
    }

    //console.log(asset)
    return asset

}

function refreshWeeklyChart(asset){

    let lastElement = asset.stats.withinMinuteData[asset.stats.withinMinuteData.length-1]
    if(asset.weeklyChart.length < 7){
        asset.weeklyChart.push(lastElement)
        lastElement = []
        console.log('less than')
    }

    else{
        asset.weeklyChart.shift()
        asset.weeklyChart.push(lastElement)
        lastElement = []
        console.log('greater than')
    }

    //console.log(asset)
    return asset

}

function refreshMonthlyChart(asset){

    let lastElement = asset.stats.withinMinuteData[asset.stats.withinMinuteData.length-1]
    if(asset.monthlyChart.length < 30){
        asset.monthlyChart.push(lastElement)
        lastElement = []
        console.log('less than')
    }

    else{
        asset.monthlyChart.shift()
        asset.monthlyChart.push(lastElement)
        lastElement = []
        console.log('greater than')
    }


    //console.log(asset)
    return asset

}


function refreshYearlyChart(asset){

    let lastElement = asset.stats.withinMinuteData[asset.stats.withinMinuteData.length-1]

    asset.yearChart.push(lastElement)
    lastElement = []

    //console.log(asset)

    return asset

}






function refreshChartData(asset,timeFrame){

    let lastElement = asset.stats.withinMinuteData[asset.stats.withinMinuteData.length-1]
    switch(timeFrame){

        case 'minute':
            asset = refreshMinuteChart(asset)
            return asset
       
            break

      
        case 'daily':
            return refreshDailyChart(asset)
            break
    
    
        case 'weekly':

            return refreshWeeklyChart(asset)
            break
    
        case 'monthly':

            return refreshMonthlyChart(asset)
            break
    
        case 'yearly':

            return refreshYearlyChart(asset)
        break
    }
}





let asset1 = {
    creator: 'test1',
    launchTime: 30,
    initialized: false,
    yearChart: [],
    monthlyChart:Array.from(Array(30).keys()),
    weeklyChart: Array.from(Array(7).keys()),
    dailyChart: Array.from(Array(24).keys()),
    minuteChart:[],
    stats: {
      dailyHigh: 0,
      dailyLow: 0,
      todaysVolume: 0,
      averageVolume: 0,
      highestPeakWeek: 0,
      lowestPeakWeek: 0,
      supply: 10000,
      popularity: 0,
      marketCap: 0,
      volumeAcrossFiveDays: [],
      withinMinuteData: Array.from(Array(25).keys())
    },
    id: "62efe0b10cf4ec94633d3514"
  }


  let asset2 = {
    creator: 'test2',
    launchTime: 30,
    initialized: false,
    yearChart: [],
    monthlyChart:Array.from(Array(30).keys()),
    weeklyChart: Array.from(Array(7).keys()),
    dailyChart: Array.from(Array(24).keys()),
    minuteChart:[],
    stats: {
      dailyHigh: 0,
      dailyLow: 0,
      todaysVolume: 0,
      averageVolume: 0,
      highestPeakWeek: 0,
      lowestPeakWeek: 0,
      supply: 10000,
      popularity: 0,
      marketCap: 0,
      volumeAcrossFiveDays: [],
      withinMinuteData: Array.from(Array(25).keys())
    },
    id: "62efe0b10cf4ec94633d3514"
  }


//let asset1 = refreshDailyChart(asset,null)
// let asset2 = refreshYearlyChart(asset1,null)

// asset = refreshChartData(asset,'yearly')
// asset = refreshChartData(asset,'yearly')
// console.log(asset)



let initialDate = new Date()
let initialYear = initialDate.getFullYear()
let initialMonth = initialDate.getMonth()
let initialDay = initialDate.getDay()
let initialHour = initialDate.getHours()
let initialMinute = initialDate.getMinutes()




function run(asset){

    let currentdate = new Date();
    if(currentdate.getFullYear() != initialYear){
        refreshChartData(asset, 'yearly')
    }

    if(currentdate.getMonth() != initialMonth){
        refreshChartData(asset, 'monthly')
    }

    if(currentdate.getDay() == 6){
        refreshChartData(asset, 'weekly')
    }
    
    if(currentdate.getDay() != initialDay){

        refreshChartData(asset, 'daily')
    }

    if(currentdate.getMinutes() != initialMinute){
        refreshChartData(asset, 'minute')
        
        console.log(asset)
    }

    console.log("Seconds: " + currentdate.getSeconds())
    return asset


    
}




async function updateAllAssets(){

    let assetCollection = await assets.find()
    let id = assetCollection[0].id
    let assetsList = await assets.findById(id)

    //let assetsList = [asset1,asset2]
    //console.log(assetsList)

    for(let i = 0; i < assetsList.Assets.length; i++){
        assetsList.Assets[i] = run(assetsList.Assets[i])
        console.log('------------------------------------------')
    }

    let newDate = new Date();
    initialMinute = newDate.getMinutes()
    initialDay = newDate.getDay()
    initialMonth = newDate.getMonth()
    initialYear = newDate.getFullYear()

    let response = await assetsList.save()
    //console.log(response)
}


//updateAllAssets()


setInterval(function(){ 
    updateAllAssets()
}, 1000);
