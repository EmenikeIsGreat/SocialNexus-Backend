const mongoose = require('mongoose');



const Transaction = new mongoose.Schema({
    UserID:String,
    TxID:String,

    Transaction: JSON
},
    
    { timestamps: true },
)

module.exports = mongoose.model('Transaction', Transaction)