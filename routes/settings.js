const express = require('express')

const changeName = require('../UserRelatedFunctions/settings/changeName')
const changeUserName = require('../UserRelatedFunctions/settings/changeUserName')
const changeEmail = require('../UserRelatedFunctions/settings/changeEmail')
const changePhoneNumber = require('../UserRelatedFunctions/settings/changePhoneNumber')
const changePrivacyStatus = require('../UserRelatedFunctions/settings/changePrivacyStatus')
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

})

router.post('/changeEmail', (req, res) =>{

    let jsonInfo = req.body
    console.log(jsonInfo)
    let resValue = changeEmail(jsonInfo).then((data)=>{
        res.send(data)
        res.end()
    })
    .catch((error)=>res.send(error))

})

router.post('/changePhoneNumber', (req, res) =>{

    let jsonInfo = req.body
    console.log(jsonInfo)
    let resValue = changePhoneNumber(jsonInfo).then((data)=>{
        res.send(data)
        res.end()
    })
    .catch((error)=>res.send(error))


})

router.post('/changePassword', async (req, res) =>{
    console.log(req.body + "----------------");
    let jsonInfo = req.body

    let {id, password, newPassword} = jsonInfo

    try{
        let hashPassJson = await passwordSchema.findOne({user:id})
        bcrypt.compare(password, hashPass, function(error, isMatch) {
            if (error) {
            console.log(error);
    
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
    }

    catch(error){
        res.send({valid:false})
    }


})


router.post('/changePrivacyStatus', async (req, res) =>{

    let jsonInfo = req.body

    let resValue = await changePrivacyStatus(jsonInfo);
    
    res.send(resValue)
    res.end()

})





module.exports = router


