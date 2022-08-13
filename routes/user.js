const express = require('express')

const createUser = require('../userCommands/createUser')
const getUserBalance = require('../userCommands/getUserBalance')
const changeBio = require('../userCommands/changeBio')
const getTx = require('../userCommands/getTx')

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


router.post('/getUserBalance', (req, res) =>{

    let id = req.body
    //console.log(userJson)
    
    let resValue = getUserBalance(id).then((data)=>res.send(data))
    .catch((error)=>res.send(error))
    //res.end()


    // testing
    // res.send(req.body)
    // res.end()
})

router.post('/changeBio', (req, res) =>{

    let jsonInfo = req.body
    //console.log(userJson)
    
    let resValue = changeBio(jsonInfo).then((data)=>res.send(data))
    .catch((error)=>res.send(error))
    //res.end()


    // testing
    // res.send(req.body)
    // res.end()
})

router.post('/getTx', (req, res) =>{

    let jsonInfo = req.body
    console.log(jsonInfo)
    
    let resValue = getTx(jsonInfo).then((data)=>res.send(data))
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


