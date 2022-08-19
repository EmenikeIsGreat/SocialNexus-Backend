const mongoose = require('mongoose');




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
            deltaWeek:Object,
            deltaDay:Object,
            deltaMonth:Object,
            volumeAcrossFiveDays:[Number],
            withinMinuteData:[Number]
        },
     
    }   ]

},
    
    { timestamps: true },
)

module.exports = mongoose.model('Assets', AssetTracking)