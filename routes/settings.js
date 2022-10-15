const express = require('express')
const bodyParser = require('body-parser')


const userCollection = require('../schemas/User')
const changeName = require('../userCommands/settingsFuncs/changeName')
const changeUserName = require('../userCommands/settingsFuncs/changeUserName')
const changeEmail = require('../userCommands/settingsFuncs/changeEmail')
const changePhoneNumber = require('../userCommands/settingsFuncs/changePhoneNumber')
const changePrivacyStatus = require('../userCommands/settingsFuncs/changePrivacyStatus')
const passwordSchema = require('../schemas/passwords')
const bcrypt = require("bcryptjs")

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

router.post('/changePassword', async (req, res) =>{

    let jsonInfo = req.body

    let {id, password, newPassword} = jsonInfo
    let hashPassJson = await passwordSchema.findOne({ID:id})
    let hashPass = hashPassJson.encryptedPassword

    console.log("old Passcode: " + hashPass)

    bcrypt.compare(password, hashPass, function(error, isMatch) {
        if (error) {
        throw error
        } else if (!isMatch) {
        console.log("Password doesn't match!")
        res.send({valid:false})
        } else {
        console.log("Password matches!")

        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
              throw saltError
            } else {
              bcrypt.hash(newPassword, salt, function(hashError, hash) {
                if (hashError) {
                  throw hashError
                } else {
                    
                    hashPassJson.encryptedPassword = hash
                    async function saveToDatabase(){
                        let response = await hashPassJson.save();
                    }
                    saveToDatabase()
                    res.send({valid:true})

                }
              })
            }
          })

        }
    })

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


