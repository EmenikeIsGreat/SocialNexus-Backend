const mongoose = require("mongoose");
const tx = require('../../schemas/transaction')



const path = require('path');

const coolPath = path.join(__dirname, '../../.env')
require("dotenv").config({path:coolPath})

//console.log(process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connected")
})
    .catch((error)=>{
        console.log(error);

    })

async function getTransaction(jsonInfo){

    let {id, amount, initialRender, date} = jsonInfo
    amount = parseInt(amount)

    let doesUserExist = await tx.exists({'UserID':id});
    //console.log(doesUserExist)
    if(!doesUserExist){
        console.log("THE USER IS NOT FOUND. CANNOT GET TRANSACTIONS")
        return null;
    }


    try{
        if(initialRender){
            console.log("Emenike")
            let transaction = await tx.find({'UserID':id}).sort({$natural:-1}).limit(amount)
            console.log("trasnaction: " + transaction == 'undefined');
            
           
            let max = false
            if(transaction.length < amount){
                max = true
            }
            let lastDate = () => {
                if(transaction == 'undefined'){
                    return false;
                }
                else{
                    return transaction[transaction.length-1].createdAt
                }

            }
            let output = {
                transactions: transaction,
                lastDate:lastDate(),
                
                max:max
            }
            //console.log(output)
            return output
        }
    
        else{

            let nextTransaction = await tx.find({"UserID":id,
            createdAt: {
                $lte: new Date(date)
            }
                }).sort({$natural:-1}).limit(amount)
    
            //console.log(nextTransaction)



            let max = false
            if(nextTransaction.length < amount){
                max = true
            }
            let output = {
                transactions: nextTransaction,
                lastDate: nextTransaction[nextTransaction.length-1].createdAt,
                max:max
            }
            //console.log(output)
            return output
        }
    }

   catch(error){
        //console.log(error)
       return error
       
   }


}

getTransaction({id: '63b79170871e180d114f80c9',amount: 100,initialRender: true,date: "2022-08-13T20:01:25.546Z"})

async function test1(){
    let order = await tx.find({'UserID':'63b79170871e180d114f80c9'}).sort({$natural:-1}).limit(1)

    console.log(order)
}

//test1()
