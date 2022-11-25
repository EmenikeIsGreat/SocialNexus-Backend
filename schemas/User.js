const mongoose = require('mongoose');
//const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

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

    privacy:Boolean,

    Bio:String,

    profilePic:String,

    hasProfilePic: Boolean

    },

    { timestamps: true },
)


// User.plugin(mongoose_fuzzy_searching, { fields: 
//     [
//         {
//             firstName:"firstName"
//         },
//         {
//             lastName:"lastName"
//         }
//     ] 
// });

module.exports = mongoose.model('User', User)



