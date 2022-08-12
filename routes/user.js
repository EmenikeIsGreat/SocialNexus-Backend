const express = require('express')
const userCollection = require('../schemas/User')
const transaction = require('../Blockchain/wrappedFabConnect/transactions')
const query = require('../Blockchain/wrappedFabConnect/query')



const router = express.Router()



/*

edit bio post

deposit post

withdraw post

share post

get Balance get

get orders get

get bids get

get notifications get 

follow/unfollow post

*/


module.exports = router


