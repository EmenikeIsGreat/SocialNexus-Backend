
const express = require('express')


const getUserBalance = require('../UserRelatedFunctions/get/getUserBalance')
const changeBio = require('../UserRelatedFunctions/settings/changeBio')
const getTx = require('../UserRelatedFunctions/get/getTx')
const getAsset = require('../AssetFunctions/getAsset')
const followUnfollow = require('../UserRelatedFunctions/profileCommands/followUnfollow')
const queryUser = require('../UserRelatedFunctions/profileCommands/renderQueriedUser')
const multer  = require('multer');
const os = require('os')
const upload = multer({ dest: os.tmpdir()});
const {changePhoto} = require('../UserRelatedFunctions/profileCommands/changePhoto')
const {deletePhoto} = require('../UserRelatedFunctions/profileCommands/deletePhoto')
const {searchUser, searchAsset} = require('../full-text-search/index')
const getPortfolioInvestments = require('../UserRelatedFunctions/get/getPortfolioInvestments')
const userSchema = require('../schemas/User')

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
  
    
    let resValue = changeBio(jsonInfo).then((data)=>res.send(data))
    .catch((error)=>res.send(error))


})

router.get('/getTx', (req, res) =>{

    let {data} = req.query
    console.log(jsonInfo)
    
    let resValue = getTx(specs).then((data)=>res.send(data))
    .catch((error)=>res.send(error))

})

router.get('/getAsset', (req, res) =>{

    let {name} = req.query
    let resValue = getAsset(name).then((data)=>res.send(data))
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


router.get('/deletePhoto:id', async (req, res) =>{


    let user = userSchema.findById(req.params.id)

    if(user.hasProfilePic){
        let readStream = deletePhoto(req.params.id)
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


router.post('/changePhoto:id', upload.single('file'), async (req, res) =>{
    
    console.log(req.params.id)

    
    const title = req.body.title;

    const file = req.file;  
    
    
    let response = await changePhoto(file, req.params.id)


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



module.exports = router


