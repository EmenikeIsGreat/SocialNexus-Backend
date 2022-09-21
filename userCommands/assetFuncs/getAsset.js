

const mongoose = require("mongoose");
const assets = require('../../schemas/Assets')


const path = require('path');

const coolPath = path.join(__dirname, '../.env')
require("dotenv").config({path:coolPath})

//console.log(process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connected")
})
    .catch((error)=>{
        console.log(error);

    })
module.exports = async function getAsset(jsonInfo){

    let {id} = jsonInfo
    try{

        let assetCollection = await assets.find()
        let assetID = assetCollection[0].id
        let assetsList = await assets.findById(assetID)
 
        let asset
        //console.log(assetsList.Assets)
        let position
        for(let i = 0; i < assetsList.Assets.length; i++){
            if(assetsList.Assets[i].id == id){

                asset = assetsList.Assets[i]
                break
                
            }
        }
       //console.log(asset)
       return asset
    }

   catch(error){
        console.log(error)
       return error
       
   }


}

//getAsset({id: '62f2fa563471195687a3f0e8'})

