const mongoose = require("mongoose");
const user = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const orders = require('../../schemas/Orders')
const bids = require('../../schemas/Bids.js')
const Message = require('../../schemas/Message')
const User = require('../../schemas/User');
let Price = require('../../schemas/AssetTracking')
const ExternalTx = require('../../schemas/ExternalTransactions')


// implement in production
let userUpdate;

async function message(UserID, payload){
    try{
       let message = await Message.create({
            sender: "astra",
            recipient: UserID,
            body: payload
        })
        console.log("message Sent")
    }

    catch(error){
        console.log(error);
    }
}


async function updateBalance(event){
    let user = await User.findById(event.UserID)
    user.Balances = event.UserBalance
    console.log(user);
    await user.save();
}

async function simulateTxProcessing(event){


        switch (event.Type){
            case "Order":
                let price = await Price.create({
                    AssetID: event.Transaction.AssetID,
                    Price: event.Transaction.NewPriceOfAsset
                })

                let tx = await orders.create({
                    Type: event.Transaction.Type,
                    UserID: event.UserID,
                    OrderID: event.Transaction.orderID,
                    Transaction: event.Transaction,
                })

                await updateBalance(event)
            
                await message(event.UserID, event.Transaction)
                break

            case "RecievedAssetFromInit":
                let price2 = await Price.create({
                    AssetID: event.Transaction.AssetID,
                    Price: event.Transaction.NewPriceOfAsset
                })

                let tx3 = await orders.create({
                    Type: event.Transaction.Type,
                    UserID: event.UserID,
                    OrderID: event.Transaction.orderID,
                    Transaction: event.Transaction,
                })

                await updateBalance(event)
            
                await message(event.UserID, event.Transaction)
                break
            
            case "Bid":
                let tx1 = await bids.create({
                    UserID: event.UserID,
                    BidID: event.Transaction.BidID,
                    Transaction: event.Transaction
            
                })
                await updateBalance(event)
        
                await message(event.UserID, event.Transaction)
                break
            
            // deposits, withdraws, transfers
            case "External":
                let tx2 = await ExternalTx.create({
                    UserID: event.UserID,
                    Transaction: event.Transaction
                })

                await updateBalance(event)
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
        

            case "AssetInit":{
                AssetInit = await User.findById(event.UserID); 
                AssetInit.Asset.AssetID = true
                AssetInit.Asset = {
                    AssetID: event.AssetID,
                    InitStatus: true
                }
                AssetInit.save();
                let messages = event.AssetID + " has been initialized"
                await message(event.UserID, messages)
                break
            }


            case "RecievedAssetFromInit":{
      
                let tx = await orders.create({
                    Type: event.Transaction.Type,
                    UserID: event.UserID,
                    OrderID: event.Transaction.orderID,
                    Transaction: event.Transaction,
                })
            
                await message(event.UserID, event.Transaction)
                break
            } 


            default:
                console.log("no events match")
        }

}

simulateTxProcessing(sampleAssetEvent)

