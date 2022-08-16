
const mongoose = require('mongoose');

const User = new mongoose.Schema({


        userID:String,
        
        yearChart:[Number],
        monthlyChart:[Number],
        weeklyChart:[Number],
        dailyChart:[Number],
        minuteChart:[Number],
    
        stats:{
            deltaWeek:Number,
            deltaDay:Number,
            deltaMonth:Number,
        },
    },
    { timestamps: true },
)

module.exports = mongoose.model('User', User)



