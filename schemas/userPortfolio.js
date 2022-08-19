
const mongoose = require('mongoose');

const User = new mongoose.Schema({


        userID:String,
        currentPrice: Number,
        yearlyChart:[Number],
        monthlyChart:[Number],
        weeklyChart:[Number],
        dailyChart:[Number],
        minuteChart:[Number],
        withinMInutData:[Number],
    
        stats:{
            deltaYear:Number,
            deltaWeek:Number,
            deltaDay:Number,
            deltaMonth:Number,
        },
    },
    { timestamps: true },
)

module.exports = mongoose.model('User', User)



