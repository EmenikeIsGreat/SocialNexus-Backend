const mongoose = require("mongoose");
const user = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const orders = require('../schemas/Orders')
const bids = require('../schemas/Bids.js')
const Message = require('../schemas/Message')
const User = require('../schemas/User');
const ExternalTx = require('../schemas/ExternalTransactions')
const updateStatistics = require('../Asset/updateStatistics')
const tx = require('../schemas/transaction')


async function message(UserID, payload){
    try{
       let message = await Message.create({
            sender: "SocialNexus",
            recipient: UserID,
            body: payload
        })
        console.log("message Sent")
    }

    catch(error){
        console.log(error);
    }
}

let sampleAssetEvent = {
    UserID:"62b750b69e2542d58f9721c6",
    Type: "RecievedAssetFromInit",
    Transaction:{
        Type:"InitAsset",
        orderID: "test123",
        AssetID: "EmenikeID3",
        AssetAmount: 20,
        USDSHAmount: 20,
        StrikePrice: 37,
        fee: 30,
        NewPriceOfAsset: 44
    },
    UserBalance:{
        USDSH: 27,
        ArinzeCoin: 38
    }
}


let sampleOrderEvent = {
    UserID:"62b750b69e2542d58f9721c6",
    Type: "Order",
    Transaction:{
        Type:"Buy",
        orderID: "test123",
        AssetID: "62f2fa563471195687a3f0e8",
        AssetAmount: 40,
        USDSHAmount: 20,
        StrikePrice: 37,
        fee: 30,
        NewPriceOfAsset: 47,
    },
    UserBalance:{
        USDSH: 27,
        EmenikeCoin: 38
    }
}

let sampleBidEvent = {
    UserID:"62b750b69e2542d58f9721c6",
    Type: "Bid",
    Transaction:{
        BidID: "test123",
        AssetID: "EmenikeID",
        USDSHAmount: 60,
    },
    UserBalance:{
        USDSH: 26,
        EmenikeCoin: 35
    }
}


let sampleExternalEvent = {
    UserID:"62f7fdd597c2ceea6ad4595c",
    Type: "External",
    
    Transaction:{
        External: "deposit",
        USDSHAmount: 20,
    },

    UserBalance:{
        USDSH: 25,
        EmenikeCoin: 35
    }
}

async function simulateTxProcessing(event){


        switch (event.Type){
            case "Order":


                // let tx = await orders.create({
                //     Type: event.Transaction.Type,
                //     UserID: event.UserID,
                //     OrderID: event.Transaction.orderID,
                //     Transaction: event.Transaction,
                // })

                
                let transaction1 = await tx.create({
                    Type: event.Transaction.Type,
                    UserID: event.UserID,
                    OrderID: event.Transaction.orderID,
                    Transaction: event.Transaction,
                })

                let response = await updateStatistics(event.Transaction.AssetID, 
                                    event.Transaction.NewPriceOfAsset,  
                                    event.Transaction.AssetAmount)


            
                await message(event.UserID, event.Transaction)
                break

            case "RecievedAssetFromInit":
  

                // let tx3 = await orders.create({
                //     Type: event.Transaction.Type,
                //     UserID: event.UserID,
                //     OrderID: event.Transaction.orderID,
                //     Transaction: event.Transaction,
                // })

                let transaction2 = await tx.create({
                    Type: event.Transaction.Type,
                    UserID: event.UserID,
                    OrderID: event.Transaction.orderID,
                    Transaction: event.Transaction,
                })


            
                await message(event.UserID, event.Transaction)
                break
            
            case "Bid":
                // let tx1 = await bids.create({
                //     UserID: event.UserID,
                //     BidID: event.Transaction.BidID,
                //     Transaction: event.Transaction
            
                // })

                let transaction3 = await tx.create({
                    Type: event.Transaction.Type,
                    UserID: event.UserID,
                    OrderID: event.Transaction.orderID,
                    Transaction: event.Transaction,
                })
          
        
                await message(event.UserID, event.Transaction)
                break
            
            // deposits, withdraws, transfers
           
            case "External":
                // let tx2 = await ExternalTx.create({
                //     UserID: event.UserID,
                //     Transaction: event.Transaction
                // })


                let transaction4 = await tx.create({
                    Type: event.Transaction.Type,
                    UserID: event.UserID,
                    OrderID: event.Transaction.orderID,
                    Transaction: event.Transaction,
                })

                await message(event.UserID, event.Transaction) 
                break 

            case "CreateUser":
                await message(event.UserID, "user has been created on the Blockchain") 
                break;
            
            
            case "CreateAsset":
                let AssetCreate = await User.findById(event.UserID);
            
                AssetCreate.Asset = {
                    AssetID: event.AssetID,
                    InitStatus: false
                }
                await AssetCreate.save();
                let messages = event.AssetID + " has been created"
                await message(event.UserID, messages)
                break;
        


            default:
                console.log("no events match")
        }

}

simulateTxProcessing(sampleExternalEvent)

