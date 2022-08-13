const express = require('express')
const userCollection = require('../schemas/User')
const transaction = require('../Blockchain/wrappedFabConnect/transactions')
const query = require('../Blockchain/wrappedFabConnect/query')
const createUser = require('../userCommands/createUser')
const bodyParser = require('body-parser')
const router = express.Router()





router.post('/createUser', (req, res) =>{

    let userJson = req.body
    //console.log(userJson)
    
    let resValue = createUser(userJson).then((data)=>res.send(data))
    .catch((error)=>res.send(error))
    //res.end()


    // testing
    // res.send(req.body)
    // res.end()
})



/*



render user post

edit bio post

deposit post

withdraw post

share post

get Balance get

get orders get

get bids get

check order status get 

get Asset get 

get notifications get 

follow/unfollow post

*/


module.exports = router


