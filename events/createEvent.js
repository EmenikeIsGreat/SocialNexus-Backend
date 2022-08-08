const mongoose = require("mongoose");
const user = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const orders = require('../../schemas/Orders')
const bids = require('../../schemas/Bids.js')
const Message = require('../../schemas/Message')
const User = require('../../schemas/User');
let Price = require('../../schemas/AssetTracking')
const ExternalTx = require('../../schemas/ExternalTransactions')




mongoose.connect(user).then((result) =>{
    console.log("connected")
}).catch((error) =>{
    console.log(error)
})

async function transferTransaction(){
    try{
       let transaction = await transfers.create({
            UserID: "Emenike",
            Transaction:{
                TransactionID:"123",
                senderID: "Emenike",
                recipientID: "Arinze",
                AssetID:"testCoin",
                AssetAmount:100
            }
        })
        await message(transaction)
    }

    catch(error){
        console.log(error);
    }
}

//transferTransaction()

async function orderTransaction(){
    try{
        let order = await orders.create({
             ID: "Emenike",
             Transaction:{
                 UserID: "Emenike",
                 AssetID: "testCoin",
                 AssetAmount:50,
                 USDSHAmount:100,
                 OldPrice: 20,
                 NewPriceOfAsset: 20.1
             }
         })
         await message(order)
     }
 
     catch(error){
         console.log(error);
     }
}

//orderTransaction()

async function BidTransaction(){
    try{
        let bid = await bids.create({
             ID: "Emenike",
             Transaction:{
                 UserID: "Emenike",
                 AssetID: "testCoin",
                 USDSHAmount:100
             }
         })

        await message(bid)
         
     }
 
     catch(error){
         console.log(error);
     }
}

//BidTransaction()



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

//message("Hello World")

async function userEvent(){
    try{
       let message = await User.create({
            UserID:"EmenikeID2",
            firstName:"Emenike",
            lastName:"Anigbogu",
            userName:"DarkChocolate",
            email:"emenikeani3@gmail.com",
            phoneNumber:"6172869610"
            })
        console.log(message)
    }

    catch(error){
        console.log(error);
    }
}

//userEvent()

// orders
let sampleOrderEvent = {
    UserID:"62b750b69e2542d58f9721c6",
    Type: "Order",
    Transaction:{
        Type:"Buy",
        orderID: "test123",
        AssetID: "EmenikeID3",
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
// bids
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

//deposits, withdraws, trasnfers
let sampleExternalEvent = {
    UserID:"62b750b69e2542d58f9721c6",
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

let sampleCreateUserEvent = {
    Type:"CreateUser",
    UserID: "62b3c648128f32cbeb9878cb",
    status: true 
}

let sampleCreatAssetEvent = {
    Type:"CreateAsset",
    UserID: "62b750b69e2542d58f9721c6",
    AssetID:"testCoin", 
}

let initializeAsset = {
    Type: "AssetInit",
    UserID: "62b750b69e2542d58f9721c6",
    AssetID:"testCoin"
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


// implement in production
let userUpdate;

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

async function createUser(){
    let val = await User.create({
        UserID:null,
        
        firstName:"Emenike",
    
        lastName:"Anigbogu",
    
        userName:"Emenike",
        email:"emenikeani3@gmail.com",
        phoneNumber:"6172869610",
    
        photoURL:"lol",
    
        following:200,
    
        followers: 300,
    
        createdAsset:null,
        
        Balances: {
            USDSH: 0
        }

    })

    //console.log(val)

    let val2 = await User.findById(val.id);
    //console.log(val2)
    val2.UserID = val.id
    await val2.save()
    let val3 = await User.findById(val.id);
    console.log(val3)
}

//createUser()

async function findID(id){

    let val2 = await User.findById(id)
    console.log(val2)
}
//findID("62b75016889246d7439f870c")


//getUser("62b3c648128f32cbeb9878cb");

