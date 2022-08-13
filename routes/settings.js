const express = require('express')
const bodyParser = require('body-parser')


const userCollection = require('../schemas/User')
const changeName = require('../userCommands/changeName')
const changeUserName = require('../userCommands/changeUserName')
const changeEmail = require('../userCommands/changeEmail')
const changePhoneNumber = require('../userCommands/changePhoneNumber')
const changePassword = require('../userCommands/changePassword')
const changePrivacyStatus = require('../userCommands/changePrivacyStatus')

const router = express.Router()




router.post('/changeName', (req, res) =>{

    let jsonInfo = req.body
    
    let resValue = changeName(jsonInfo).then((data)=>{
        console.log(data)
        res.send(data)
        res.end()
    })
    .catch((error)=>res.send(error))
    //res.end()


    // testing
    // res.send(req.body)
    // res.end()
})

router.post('/changeUserName', (req, res) =>{

    let jsonInfo = req.body
    
    let resValue = changeUserName(jsonInfo).then((data)=>{
        console.log(data)
        res.send(data)
        res.end()
    })
    .catch((error)=>res.send(error))
    //res.end()


    // testing
    // res.send(req.body)
    // res.end()
})

router.post('/changeEmail', (req, res) =>{

    let jsonInfo = req.body
    console.log(jsonInfo)
    let resValue = changeEmail(jsonInfo).then((data)=>{
        res.send(data)
        res.end()
    })
    .catch((error)=>res.send(error))
    //res.end()


    // testing
    // res.send(req.body)
    // res.end()
})

router.post('/changePhoneNumber', (req, res) =>{

    let jsonInfo = req.body
    console.log(jsonInfo)
    let resValue = changePhoneNumber(jsonInfo).then((data)=>{
        res.send(data)
        res.end()
    })
    .catch((error)=>res.send(error))


    //res.end()


    // testing
    // res.send(req.body)
    // res.end()
})

router.post('/changePassword', (req, res) =>{

    let jsonInfo = req.body

    let resValue = changePassword(jsonInfo).then((data)=>{
        res.end()
    })
    .catch((error)=>res.send(error))


    //res.end()


    // testing
    // res.send(req.body)
    // res.end()
})


router.post('/changePrivacyStatus', (req, res) =>{

    let jsonInfo = req.body

    let resValue = changePrivacyStatus(jsonInfo).then((data)=>{
        res.send(data)
        res.end()
    })
    .catch((error)=>res.send(error))


    //res.end()


    // testing
    // res.send(req.body)
    // res.end()
})



module.exports = router


