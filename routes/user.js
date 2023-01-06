
const express = require('express')

const stringify =  require('json-stringify-deterministic')

const getUserBalance = require('../UserRelatedFunctions/get/getUserBalance')
const changeBio = require('../UserRelatedFunctions/settings/changeBio')
const getTx = require('../UserRelatedFunctions/get/getTx')
const getAsset = require('../AssetFunctions/getAsset')
const followUnfollow = require('../UserRelatedFunctions/profileCommands/followUnfollow')
const queryUser = require('../UserRelatedFunctions/profileCommands/renderQueriedUser')
const multer  = require('multer');
const os = require('os')
const upload = multer({ dest: 'uploads/'});
const changePhoto = require('../UserRelatedFunctions/profileCommands/changePhoto')
const {deletePhoto} = require('../UserRelatedFunctions/profileCommands/deletePhoto')
const {searchUser, searchAsset} = require('../full-text-search/index')
const getPortfolioInvestments = require('../UserRelatedFunctions/get/getPortfolioInvestments')
const userSchema = require('../schemas/User')
const getMessages = require("../UserRelatedFunctions/get/getMessage") 
const router = express.Router()





router.get('/getUserBalance', (req, res) =>{

    let {id} = req.query

    
    let resValue = getUserBalance(id).then((data)=>res.send(data))
    .catch((error)=>res.send(error))
    //res.end()


    // testing
    // res.send(req.body)
    // res.end()
})

router.post('/changeBio', (req, res) =>{

    let jsonInfo = req.body
    
    console.log(jsonInfo)
  
    let resValue = changeBio(jsonInfo).then((data)=>res.send(data))
    .catch((error)=>res.send(error))

})




router.get('/getAsset', (req, res) =>{
    console.log("running get asset commmand")
    let {asset} = req.query

    let resValue = getAsset(asset).then((data)=>{
        res.send(data)
    })
    .catch((error)=>res.send(error))

})


router.post('/followUnfollow', (req, res) =>{

    let jsonInfo = req.body
    console.log(jsonInfo)
    
    let resValue = followUnfollow(jsonInfo).then((data)=>{

        res.send(data) })
    .catch((error)=>res.send(error))

})


router.get('/queryUser', (req, res) =>{

    let data = req.query

    
    let resValue = queryUser(data).then((data)=>{

        res.send(data) })
    .catch((error)=>res.send(error))

})


router.get('/deletePhoto', async (req, res) =>{
    console.log(req.query.id)
    let user = await userSchema.findById(req.query.id)


    if(user.hasProfilePic){
        console.log("has photo")
        await deletePhoto(req.query.id)
        user.hasProfilePic = false;
        await user.save();
        res.send({
            hadPhoto:true,
            removedPhoto:true
        })
        res.end()
    }

    else{
        res.send({
            hadPhoto:false,
            removedPhoto:false
        })

        res.end()
    }


})


router.post('/changePhoto', upload.single('profile'), async (req, res) =>{
    console.log("changing photo")
    
    console.log("this is the ID 2" + req.query.id)




    
    const title = req.body.title;

    const file = req.file;  
    
    
    let response = await changePhoto(file, req.query.id)
    


    res.send(response)
    res.end();
})



router.get('/search', async (req, res) =>{

    const {type, input} = req.query.data


    if(type == "user"){
        res.send({potentialUsers: await searchUser(input)})
    }

    else{
        res.send({potentialAssets: await searchAsset(input)})
    }

    

})

router.get('/portfolioInvestments', async (req, res) =>{

    const {id,renderAll} = req.query

    let response = await getPortfolioInvestments({id:id, renderAll:renderAll})

    res.send(response)

    
})


router.get('/getMessages',async (req,res)=>{
    console.log("check 1 " + stringify(req.query))
    let response = await getMessages(req.query);
    console.log("---------------")
    console.log(response)
    res.send(response);
})

router.get('/getTx', async (req, res) =>{

    console.log("check 1 " + stringify(req.query))
    let response = await getTx(req.query);
    console.log("---------------")
    console.log(response)
    res.send(response);

})









module.exports = router


