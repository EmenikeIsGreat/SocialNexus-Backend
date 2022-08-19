const mongoose = require("mongoose");
const url = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const User_Portfolio = require('../schemas/userPortfolio')
const Pusher = require("pusher");
const stringify = require("stringify")
const query = require('../Blockchain/wrappedFabConnect/query')
const AssetList = require('../schemas/listofAssetByName')
const hash = require('hash')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

// mongoose.connect(url).then((result) =>{
//     console.log("connected")
// }).catch((error) =>{
//     console.log(error)
// })



//node updateTimeSensitveData



let nameOfAllAssets = new hash()
let position = 0

app.post('/addAsset', (req,res)=>{
    let {name} = req.body

    nameOfAllAssets.set(name, position)
    position++
})

let port = 3001
app.listen(port,()=>{
    console.log("add Asset modifier is listenong on port " + port)
})








async function calculateTotalValOfUsersPortfolio(userID){


    // let prices = await query('getPrice',stringify(nameOfAllAssets))
    // prices = prices.result

    // let usersBalance = await query('getUser', userID)
    // usersBalance = usersBalance.result
    
    let totalAssetEvalInUSD = 0

    //testing
    let usersBalance = {LP:{balance:50}, JP:{balance:60}, kP:{balance:50}, yP:{balance:60}
                        ,rP:{balance:50}, fP:{balance:60},jP:{balance:50}}

    nameOfAllAssets.set("LP",0)
    nameOfAllAssets.set("JP",1)
    nameOfAllAssets.set("kP",2)
    nameOfAllAssets.set("yP",3)
    nameOfAllAssets.set("rP",4)
    nameOfAllAssets.set("fP",5)
    nameOfAllAssets.set("jP",6)


    let prices = [{asset:"LP", price:40},{asset:"JP", price:40}, 
                {asset:"kP", price:40},{asset:"yP", price:40}, 
                {asset:"rP", price:40}, {asset:"fP", price:40}, 
                {asset:"jP", price:40}]
    

    console.log(Object.keys(usersBalance).length)
    for(let i = 0; i < Object.keys(usersBalance).length; i++){

        let token = Object.keys(usersBalance)[i]
        console.log(token)

        let tokenShare = usersBalance[token].balance

        let positionOfAssetInPrices = nameOfAllAssets.get(token)
        console.log("NUMBER: "+positionOfAssetInPrices)


        let assetPPS = prices[positionOfAssetInPrices].price

        let totalValuationOfAssetInUSD = tokenShare*assetPPS
        totalAssetEvalInUSD += totalValuationOfAssetInUSD

        console.log(totalAssetEvalInUSD)
       
    }
    console.log(totalAssetEvalInUSD)
    return totalAssetEvalInUSD
}


//calculateTotalValOfUsersPortfolio(20)




let sampleUserPortfolio = {
    userID:"Emenike",
    currentPrice: 20,
    yearlyChart:[1,2,3,4],
    monthlyChart:[1,2,3,4],
    weeklyChart:[1,2,3,4],
    dailyChart:[1,2,3,4],
    minuteChart:[1,2,3,4],

    stats:{
        deltaYear:0,
        deltaWeek:0,
        deltaDay:0,
        deltaMonth:0,
    }
}




function modifyChartDataArray(array, valuation, limit){


    let lastElement = array[array.length-1]


    if(limit == null){
        limit =  Number.MAX_SAFE_INTEGER + 1
    }

    if(array.length < limit){
        array.push(valuation)
        lastElement = []
        console.log('less than')
    }

    else{
        array.shift()
        array.push(valuation)
        lastElement = []
        console.log('greater than')
    }

    return array
}

function updateChartData(portfolio, valuation, timeFrame){



    switch(timeFrame){
        case 'yearly':
            portfolio.yearlyChart = modifyChartDataArray(portfolio.yearlyChart, valuation, null)
            break
        case "monthly":
            portfolio.monthlyChart = modifyChartDataArray(portfolio.monthlyChart, valuation, 12)
            break
        
        case "weekly":

            portfolio.weeklyChart = modifyChartDataArray(portfolio.weeklyChart, valuation, 52)
            break
        case "daily":
            portfolio.dailyChart = modifyChartDataArray(portfolio.dailyChart, valuation, 365)
            break
        case 'minute':
            portfolio.minuteChart = modifyChartDataArray(portfolio.minuteChart, valuation, 60)

        default:
            console.log("no options")
    }

    return portfolio

}

//updateChartData(sampleUserPortfolio, 30, 'minute')


function updateStats(portfolio, evaluation){

    portfolio.currentPrice = evaluation

    if(portfolio.yearlyChart.length > 1){

        portfolio.stats.deltaYear = (portfolio.yearlyChart[portfolio.yearlyChart.length-1] - 
            portfolio.yearlyChart[portfolio.yearlyChart.length-2])/portfolio.yearlyChart[portfolio.yearlyChart.length-2]*100

    }

    if(portfolio.monthlyChart.length > 1){

        portfolio.stats.deltaMonth = (portfolio.monthlyChart[portfolio.monthlyChart.length-1] - 
            portfolio.monthlyChart[portfolio.monthlyChart.length-2])/portfolio.monthlyChart[portfolio.monthlyChart.length-2]*100

    }


    if(portfolio.weeklyChart.length > 1){
        
        portfolio.stats.deltaWeek = (portfolio.weeklyChart[portfolio.weeklyChart.length-1] - 
            portfolio.weeklyChart[portfolio.weeklyChart.length-2])/portfolio.weeklyChart[portfolio.weeklyChart.length-2]*100
  
    }


    if(portfolio.dailyChart.length > 1){
        portfolio.stats.deltaDay = (portfolio.dailyChart[portfolio.dailyChart.length-1] - 
            portfolio.dailyChart[portfolio.dailyChart.length-2])/portfolio.dailyChart[portfolio.dailyChart.length-2]*100
    }

    console.log(portfolio)
}

//updateStats(sampleUserPortfolio, 40)





let initialDate = new Date()
let initialYear = initialDate.getFullYear()
let initialMonth = initialDate.getMonth()
let initialDay = initialDate.getDay()
let initialHour = initialDate.getHours()
let initialMinute = initialDate.getMinutes()


async function run(portfolio){

    //subsittute this for total evaluation from the calcualte function above
    let valuation = 20;

    let currentdate = new Date();


    if(currentdate.getFullYear() != initialYear){
        // run updateUsersPortofilio functin
        portfolio = updateChartData(portfolio,valuation,'yearly')
    }

    if(currentdate.getMonth() != initialMonth){
        // run updateUsersPortofilio functin   
        portfolio = updateChartData(portfolio,valuation,'monthly') 
    }

    if(currentdate.getDay() == 6){
        // run updateUsersPortofilio functin    
        portfolio = updateChartData(portfolio,valuation,'weekly')
    }
    
    if(currentdate.getDay() != initialDay){
        // run updateUsersPortofilio functin   
        portfolio = updateChartData(portfolio,valuation,'daily') 
    }

    if(currentdate.getMinutes() != initialMinute){
        // run updateUsersPortofilio functin
        portfolio = updateChartData(portfolio,valuation,'minute')
    }
    
    // get the user ID of the portfolio and save it to the database

    console.log("Seconds: " + currentdate.getSeconds())

    portfolio = updateStats(portfolio, valuation)

    return portfolio



}


async function updateAllUsersPortfolio(){
    // queres the database and run a forloop and pass in the array into 
}

// let sample = {name:{first:"Emenike", last:"Anigbogu"}}

// console.log(Object.keys(sample)[0])
// console.log(sample['first'])