
const { Double } = require('mongodb');
const mongoose = require('mongoose');

const Portfolio = new mongoose.Schema({


        userID:String,
        currentPrice: Double,
        yearlyChart:[Double],
        monthlyChart:[Double],
        weeklyChart:[Double],
        dailyChart:[Double],
        minuteChart:[Double],
    
        stats:{
            deltaYear:Double,
            deltaWeek:Double,
            deltaDay:Double,
            deltaMonth:Double,
        },
    },
    { timestamps: true },
)

module.exports = mongoose.model('userPortfolio', Portfolio)



