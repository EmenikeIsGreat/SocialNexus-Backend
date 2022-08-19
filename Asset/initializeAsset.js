
const mongoose = require("mongoose");
const url = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const transaction = require('../Blockchain/wrappedFabConnect/transactions')
const asset = require('../schemas/Assets')
const message = require('../Notification/createMessage')
const query = require('../Blockchain/wrappedFabConnect/query')

mongoose.connect(url).then((result) =>{
    console.log("connected")
}).catch((error) =>{
    console.log(error)
})



async function initializeAsset(assetID){

    try{
        
        let assetsCollection = await asset.findById('62eed22534cbb2652dac050d')
        //console.log(assetsCollection)
        console.log('--------------------')

        //console.log(assetsCollection)

        let creator

        let asset = stringify({
            assets: [assetID]
        })
        await transaction("Emenike", "test", "contract", "initalizeAssets", [assetID], true)
        let price = await query("Emenike", "test", "contract", "getPrice", [asset])
        let messageToAssetCreator = await message(price.results[0].ID,"Your asset has been intialized")
        
        
        price = price.results[0].ID
        for(let i = 0; i < assetsCollection.Assets.length; i++){
            if(assetsCollection.Assets[i].id == assetID){
                assetsCollection.Assets[i].initialized = true
                assetsCollection.Assets[i].stats.withinMinuteData = price
                creator = assetsCollection[i].creator
                break
            }
        }

        //console.log(assetsCollection)
        

        //console.log(asset)

        
        
        // let messages = assetID + " has been initialized"
        // await message("SocialNexus", creator, messages)

        
 

        let response = await assetsCollection.save()
        console.log(response.Assets[response.Assets.length-1])


        // get price of intialization and update AssetStats
        // return true
        

    }

    catch(error){
        console.log(error)
        return error
    }

}

//initializeAsset("62eed40f69f59752a1f88b53")
