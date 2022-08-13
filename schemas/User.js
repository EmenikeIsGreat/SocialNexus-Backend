const mongoose = require('mongoose');

const User = new mongoose.Schema({
    UserID:{
        type:String,
    },

    userName:{
        type: String,
        requried: true
    },
    
    firstName:{
        type: String,
        requried: true
    },

    lastName:{
        type: String,
        requried: true
    },

    userName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    phoneNumber:{
        type:String,
        required: true
    },

    photoURL: String,

    following: Number,

    followers: Number,

    createdAsset: String,
    
    Balances: Object,

    Asset:String,

    privacy:Boolean

    },

    { timestamps: true },
)

module.exports = mongoose.model('User', User)



