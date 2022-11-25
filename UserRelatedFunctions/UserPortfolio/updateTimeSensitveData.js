const mongoose = require("mongoose");
const User_Portfolio = require('../../schemas/userPortfolio')
const Pusher = require("pusher");

const query = require('../../Blockchain/wrappedFabConnect/query')
const AssetList = require('../../schemas/listofAssetByName')
const hash = require('hash')
const stringify = require('json-stringify-deterministic');
const transaction = require('../../Blockchain/wrappedFabConnect/transactions')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())



const coolPath = path.join(__dirname, '../.env')
require("dotenv").config({path:coolPath})

//console.log(process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connected")
})
    .catch((error)=>{
        console.log(error);

    })

//node updateTimeSensitveData



let nameOfAllAssets = new hash()



// only uncomment for production
// app.post('/addAsset', (req,res)=>{
//     let {name} = req.body

//     nameOfAllAssets.set(name, position)
//     position++
// })

// let port = 3001
// app.listen(port,()=>{
//     console.log("add Asset modifier is listenong on port " + port)
// })



// create test transactions

// create fake balances for user
let usersBalance = stringify({
    EA:{balance:10},
    AA:{balance:100},
    IA:{balance:5},
    EAJR:{balance:20},
    AAJR:{balance:30},
    HA:{balance:45},
    SS:{balance:22},
    LP:{balance:66},
    ES:{balance:78},
    GA:{balance:15}
})
// put fake user and their balance onto blockchain
//transaction('testing',["SocialNexus", usersBalance])

//transaction('createUser',["Emenike"])

// get usersBalances from blockchain
//query('getUser',["Emenike"]).then((data)=>console.log(data))
//query('getUser',["SocialNexus"]).then((data)=>console.log(data))





// put fake asset onto the blockchain

let fakeAsset = stringify({
    LP:{
        Asset: 20,
        USDSN:20
    }
})





// transaction('testing',["Emenike",stringify({
//     SocialNexusAsset:{balance:15}
// })])

//query('getUser',["Emenike"]).then((data)=>console.log(data))


//transaction('testing',["SocialNexusAsset", fakeAsset])
// query('getAsset',["SocialNexusAsset"]).then((data)=>console.log(data))
let arrayOfAssets = stringify(["SocialNexusAsset"])
let arrayOfAssets2 = stringify(["Emenike2Asset"])






// query('getPrice5',[arrayOfAssets]).then((data)=>console.log(data))
// .catch((error)=>console.log(error))

// query('getPrice6',[arrayOfAssets2]).then((data)=>console.log(data))
// .catch((error)=>console.log(error))


//transaction('createUser',['Emenike2'])
// transaction('createAsset',['Emenike2Asset','Emenike2'])
// transaction('deposit',['Emenike2','10000'])


let sampleOrderBid = {
    orderID: "EmenikeOrderID",
    userID: "Emenike",
    assetID: "testCoin",
    orderType: "Bid",
    usdsn: 20
}
//transaction('userBid',['Emenike2Asset', stringify(sampleOrderBid)])
//transaction('initalizeAssets',['Emenike2Asset'])
//query('getAsset',["Emenike2Asset"]).then((data)=>console.log(data))




//intialize hashmap with fake data
// nameOfAllAssets.set("EA",0)
// nameOfAllAssets.set("AA",1)
// nameOfAllAssets.set("GA",2)
// nameOfAllAssets.set("ES",3)
// nameOfAllAssets.set("LP",4)
// nameOfAllAssets.set("SS",5)
// nameOfAllAssets.set("HA",6)
// nameOfAllAssets.set("AAJR",7)
// nameOfAllAssets.set("EAJR",8)
// nameOfAllAssets.set("IA",9)
// nameOfAllAssets.set("EAJR",10)
// nameOfAllAssets.set("TR",11)
// nameOfAllAssets.set("ED",12)
// nameOfAllAssets.set("JH",13)
nameOfAllAssets.set("SocialNexusAsset",0)
// let newVaL = stringify(nameOfAllAssets)
// console.log(Object.keys(JSON.parse(newVaL)))



async function calculateTotalValOfUsersPortfolio(userID){


    let prices = await query('getPrice5',[stringify(nameOfAllAssets)])
    prices = prices.result

    

    let usersBalance = await query('getUser', [userID])
    usersBalance = usersBalance.result
    


    
    let totalAssetEvalInUSD = 0

    //testing
    
    // let prices = [{asset:"LP", price:40},{asset:"JP", price:40}, 
    //             {asset:"kP", price:40},{asset:"yP", price:40}, 
    //             {asset:"rP", price:40}, {asset:"fP", price:40}, 
    //             {asset:"jP", price:40}]
    


    for(let i = 0; i < Object.keys(usersBalance).length; i++){

        let token = Object.keys(usersBalance)[i]

        if(Object.keys((usersBalance[token])) == 'Bid'){
            continue
        }

        let tokenShare = usersBalance[token].balance

        let positionOfAssetInPrices = nameOfAllAssets.get(token)


        let assetPPS = prices[positionOfAssetInPrices].price

        let totalValuationOfAssetInUSD = tokenShare*assetPPS
        totalAssetEvalInUSD += totalValuationOfAssetInUSD


       
    }
    //console.log(totalAssetEvalInUSD)
    return totalAssetEvalInUSD
}


//calculateTotalValOfUsersPortfolio("Emenike")







function modifyChartDataArray(array, valuation, limit){


    if(limit == null){
        limit =  Number.MAX_SAFE_INTEGER + 1
    }

    if(array.length < limit){
        array.push(valuation)
        console.log('less than')
    }

    else{
        array.shift()
        array.push(valuation)

        console.log('greater than')
    }

    return array
}
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

// let port = updateChartData(sampleUserPortfolio, 30, 'minute')
// port = updateChartData(port, 30, 'minute')
// console.log(port)

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
    
    return portfolio
}

// let sampleUserPortfolio = {
//     userID:"Emenike",
//     currentPrice: 20,
//     yearlyChart:[1,2,3,4],
//     monthlyChart:[1,2,3,4],
//     weeklyChart:[1,2,3,4],
//     dailyChart:[1,2,3,4],
//     minuteChart:[1,2,3,4],

//     stats:{
//         deltaYear:0,
//         deltaWeek:0,
//         deltaDay:0,
//         deltaMonth:0,
//     }
// }



// let portfolio = updateStats(sampleUserPortfolio, 40)
// let Newportfolio = updateStats(portfolio, 40)





let initialDate = new Date()
let initialYear = initialDate.getFullYear()
let initialMonth = initialDate.getMonth()
let initialDay = initialDate.getDay()
let initialHour = initialDate.getHours()
let initialMinute = initialDate.getMinutes()


function run(portfolio, valuation){

    //subsittute this for total evaluation from the calcualte function above
    


    let currentdate = new Date();


    if(currentdate.getFullYear() != initialYear){
        // run updateUsersPortofilio functin
        updateChartData(portfolio,valuation,'yearly')
    }

    if(currentdate.getMonth() != initialMonth){
        // run updateUsersPortofilio functin   
        updateChartData(portfolio,valuation,'monthly') 
    }

    if(currentdate.getDay() == 6){
        // run updateUsersPortofilio functin    
        updateChartData(portfolio,valuation,'weekly')
    }
    
    if(currentdate.getDay() != initialDay){
        // run updateUsersPortofilio functin   
        updateChartData(portfolio,valuation,'daily') 
    }

    if(currentdate.getMinutes() != initialMinute){
        // run updateUsersPortofilio functin
        updateChartData(portfolio,valuation,'minute')

    }
    
    // get the user ID of the portfolio and save it to the database

    //console.log("Seconds: " + currentdate.getSeconds())


    
    updateStats(portfolio, valuation)
    

    //return portfolio




}

let samplePort = {
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




let initialDate2 = new Date()
let initialYear2 = initialDate2.getFullYear()
let initialMonth2 = initialDate2.getMonth()
let initialDay2 = initialDate2.getDay()
let initialHour2 = initialDate2.getHours()
let initialMinute2 = initialDate2.getMinutes()


async function updateAllUsersPortfolio(){
    let currentdate = new Date();
    console.log("Seconds: " + currentdate.getSeconds())
    if(currentdate.getMinutes() != initialMinute2){
    

        for await (const doc of User_Portfolio.find()) {
            let totalValuation = await calculateTotalValOfUsersPortfolio(doc.userID)
           
            if(totalValuation.active == false){
                continue;
            } 

            run(doc, totalValuation)
            let response = await doc.save()
            console.log(response)
          }

        let newDate = new Date();
        initialMinute2 = newDate.getMinutes()
        initialDay2 = newDate.getDay()
        initialMonth2 = newDate.getMonth()
        initialYear2 = newDate.getFullYear()
    }

}


// node updateTimeSensitveData

let currentdate = new Date();


setInterval(async ()=>{
    await updateAllUsersPortfolio()

}, 1000)



async function testing(){
    console.log("hello")
    let response = await User_Portfolio.create({
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
        })
    console.log(response)

}


//testing()




async function testing3(){
    let response = await User_Portfolio.find()
    console.log(response)
}

//testing3()

async function testing4(){
    for await (const doc of User_Portfolio.find()) {
        doc.userID = "Emenike is the goat"
        let response = await doc.save()
        console.log(response)
      }
    }

//testing4()