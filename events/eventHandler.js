const tx = require('../schemas/transaction')
const createMessage = require('../Notification/createMessage')
//const updateFrontEnd = require('../events/eventEmitter')



// these are sample events


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

module.exports = async function TxProcessing(events){

    for(i = 0; i < events.legnth ; i++){
        let event = events[i].payload

        switch (event.Type){

            case "Order":
                
                let transaction1 = await tx.create({
                    Type: event.Transaction.Type,
                    UserID: event.UserID,
                    OrderID: event.Transaction.orderID,
                    Transaction: event.Transaction,
                })

                let response = await updateStatistics(event.Transaction.AssetID, 
                                    event.Transaction.NewPriceOfAsset,  
                                    event.Transaction.AssetAmount)


            
                await createMessage("SocialNexus",event.UserID,event.Transaction)
                //updateFrontEnd(event.Transaction.Type + " - " + event.UserID,event)
                break
            

            // this is when asset is initalized
            case "RecievedAssetFromInit":
  
                let transaction2 = await tx.create({
                    Type: event.Transaction.Type,
                    UserID: event.UserID,
                    OrderID: event.Transaction.orderID,
                    Transaction: event.Transaction,
                })


                //updateFrontEnd(event.Transaction.Type + " - " + event.UserID,event)
                await createMessage("SocialNexus",event.UserID,event.Transaction)
                break
            

            // this is for when a user makes a bid
            case "Bid":
 
                let transaction3 = await tx.create({
                    Type: event.Transaction.Type,
                    UserID: event.UserID,
                    OrderID: event.Transaction.orderID,
                    Transaction: event.Transaction,
                })
          
                //updateFrontEnd(event.Transaction.Type + " - " + event.UserID,event)
                await createMessage("SocialNexus",event.UserID,event.Transaction)
                break
            

            // this is for deposit and withdraw
            case "External":

                let transaction4 = await tx.create({
                    Type: event.Transaction.Type,
                    UserID: event.UserID,
                    OrderID: event.Transaction.orderID,
                    Transaction: event.Transaction,
                })
                console.log("hitting")
                //updateFrontEnd(event.Transaction.Type + " - " + event.UserID,event)
                await message(event.UserID, event.Transaction) 
                break 

    
            default:
                console.log("no events match")
        }


    }
        

}

//TxProcessing(sampleAssetEvent)
