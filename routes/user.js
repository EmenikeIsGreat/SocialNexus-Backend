
const express = require('express')


const createUser = require('../userCommands/initialize/createUser')
const getUserBalance = require('../userCommands/queries.js/getUserBalance')
const changeBio = require('../userCommands/settingsFuncs/changeBio')
const getTx = require('../userCommands/queries.js/getTx')
const getAsset = require('../userCommands/assetFuncs/getAsset')
const followUnfollow = require('../userCommands/searchableUsers.js/followUnfollow')
const queryUser = require('../userCommands/searchableUsers.js/queryUser')
const multer  = require('multer');
const os = require('os')
const upload = multer({ dest: os.tmpdir()});
const {changePhoto} = require('../userCommands/searchableUsers.js/changePhoto')
const {getFileStream} = require('../userCommands/searchableUsers.js/getPhoto')
const {deletePhoto} = require('../userCommands/searchableUsers.js/getPhoto')
const bcrypt = require("bcryptjs")
const user = require('../schemas/User')
const passwordCollection = require('../schemas/passwords')
const renderUser = require('../userCommands/initialize/renderUser')
const {searchUser, searchAsset} = require('../full-text-search/index')

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

router.post('/getAsset', (req, res) =>{

    let jsonInfo = req.body
    console.log(jsonInfo)
    
    let resValue = getAsset(jsonInfo).then((data)=>res.send(data))
    .catch((error)=>res.send(error))
    //res.end()


    // testing
    // res.send(req.body)
    // res.end()
})


router.post('/followUnfollow', (req, res) =>{

    let jsonInfo = req.body
    console.log(jsonInfo)
    
    let resValue = followUnfollow(jsonInfo).then((data)=>{

        res.send(data) })
    .catch((error)=>res.send(error))
    //res.end()


    // testing
    // res.send(req.body)
    // res.end()
})


router.post('/queryUser', (req, res) =>{

    let jsonInfo = req.body
    console.log(jsonInfo)
    
    let resValue = queryUser(jsonInfo).then((data)=>{

        res.send(data) })
    .catch((error)=>res.send(error))
    //res.end()


    // testing
    // res.send(req.body)
    // res.end()
})



router.get('/getPhoto:id', async (req, res) =>{



    let readStream = getFileStream(req.params.id)
    


    readStream.pipe(res)
    
    //res.send(readStream.data)

    // console.log(title);
    // console.log(file);

})

router.get('/deletePhoto:id', async (req, res) =>{



    let readStream = deletePhoto(req.params.id)
    


    readStream.pipe(res)
    
    //res.send(readStream.data)

    // console.log(title);
    // console.log(file);

})


router.post('/changePhoto:id', upload.single('file'), async (req, res) =>{
    
    console.log(req.params.id)

    
    const title = req.body.title;

    const file = req.file;  
    
    
    //console.log(title)

    let response = await changePhoto(file, req.params.id)
    //console.log(response)
    // console.log(title);
    // console.log(file);

    res.send(response)
})



router.post('/signIn', async (req, res) =>{

    let {email, password} = req.body


    let potentialUser = await user.findOne({email:email})

    let userID = potentialUser.id;
    
    let encryptedUsers = await passwordCollection.findOne({ID:userID})

    encryptedUsers = encryptedUsers.encryptedPassword
    console.log("encrypted password is " + encryptedUsers)

    
    
    bcrypt.compare(password, encryptedUsers, async function(error, isMatch) {
        if (error) {
            throw error
        } 
        
        else if (!isMatch) {
            console.log("does not matched")
            res.send({valid:false})
        } 
        
        else {
            console.log('matched')
            res.send({valid:true, renderedUser: await renderUser(userID)})
        }
    })

})


router.get('/search', async (req, res) =>{

    const {type, input} = req.query


    if(type == "user"){
        res.send({potentialUsers: await searchUser(input)})
    }

    else{
        res.send({potentialAssets: await searchAsset(input)})
    }

    

})






/*






deposit post

withdraw post

share post

getTransactions

check order status get 

get notifications get 


*/


module.exports = router


