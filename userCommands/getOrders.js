const mongoose = require("mongoose");
const user = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const Orders = require('../../schemas/Orders')

mongoose.connect(user).then(()=>{
    console.log("connected")
})
    .catch((error)=>{
        console.log(error)

    })

async function getOrders(user, amount, render, date){

    try{
        if(render){
            let orders = await Orders.find({'UserID':user}).sort({$natural:-1}).limit(amount)
            console.log(orders)
            return {
                messages: orders,
                lastDate: orders[orders.length-1].createdAt
            }
        }
    
        else{
            let nextOrders = await Orders.find({"UserID":user,
            createdAt: {
                $lte: new Date(date)
            }
                }).sort({$natural:-1}).limit(amount)
    
            console.log(nextOrders)
    
            return {
                messages: nextOrders,
                lastDate: nextOrders[nextOrders.length-1].createdAt
            }
        }
    }

   catch(error){
       return error
       console.lo(error)
   }


}

//getOrders("Emenike",100,false,"2022-07-02T17:12:54.407Z")

async function test1(){
    let order = await Orders.create({
        UserID:"Emenike",
        OrderID:"1234",
        Transaction: {
            message: "test"
        }
    })

    console.log(order)
}

//test1()
