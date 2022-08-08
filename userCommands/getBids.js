const mongoose = require("mongoose");
const user = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const Bids = require('../../schemas/Bids')

mongoose.connect(user).then(()=>{
    console.log("connected")
})
    .catch((error)=>{
        console.log(error)

    })

async function getBids(user, amount, render, date){

    try{
        if(render){
            let bids = await Bids.find({'UserID':user}).sort({$natural:-1}).limit(amount)
            console.log(bids)
            return {
                messages: bids,
                lastDate: bids[bids.length-1].createdAt
            }
        }
    
        else{
            let nextBids = await Bids.find({"UserID":user,
            createdAt: {
                $lte: new Date(date)
            }
                }).sort({$natural:-1}).limit(amount)
    
            console.log(nextBids)
    
            return {
                messages: nextBids,
                lastDate: nextBids[nextBids.length-1].createdAt
            }
        }
    }

   catch(error){
       return error
       console.lo(error)
   }


}

getBids("Emenike",100,true,"2022-07-01T22:53:43.475Z")

async function test1(){
    let bid = await Bids.create({
        UserID:"Emenike",
        BidID:"1234",
        Transaction: {
            message: "test"
        }
    })

    console.log(bid)
}

//test1()
