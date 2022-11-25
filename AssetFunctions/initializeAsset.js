/// intializes asset on the blockhain. Update databse as well as notify user that their asset has been created



const mongoose = require("mongoose");
const transaction = require('../Blockchain/wrappedFabConnect/transactions')
const assetSchema = require('../schemas/Assets')
const createMessage = require('../Notification/createMessage')
const query = require('../Blockchain/wrappedFabConnect/query')


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


async function initializeAsset(assetID){

    try{
        
        let asset = await assetSchema.findById('62eed22534cbb2652dac050d')


        //blockchain transaction that intialize asset on the blockchain
        
        
        transaction("initalizeAssets", [assetID], true).then(async (data)=>{


            // the reason why this is in the callback is because we only want to query the asset after it has been intialized and this is
            // the best way to do so

            // get asset from blockchain 
            let price = query("getAsset", [assetID]).then((data)=>{
            console.log(data.result)
            })
            

            // update the asset and save it on the blockchain
            price = price.results[0].ID
            asset.initialized = true
            asset.stats.withinMinuteData = price
            creator = assetsCollection[i].creator

            // save the modified asset json to database
            await asset.save()

    

            // notify user their asset has been intialized
            await createMessage("SocialNexus", creator,"Your asset has been intialized")




        }).catch((error)=>{console.log(error)})
        
        

    }

    catch(error){
        console.log(error)
        return error
    }

}

//initializeAsset("62eed40f69f59752a1f88b53")
