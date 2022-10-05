const mongoose = require("mongoose");
const tx = require('../../schemas/transaction')



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

module.exports = async function getTransaction(jsonInfo){

    let {id, amount, initialRender, date} = jsonInfo


    doesUserExist = await tx.findById(id);
    console.log(doesUserExist);
    if(doesUserExist == null){
        return null;
    }


    try{
        if(initialRender){
            let transaction = await tx.find({'UserID':id}).sort({$natural:-1}).limit(amount)
            console.log("trasnaction: " + transaction == 'undefined');
            
           
            let max = false
            if(transaction.length < amount){
                max = true
            }
            return {
                messages: transaction,
                lastDate: () => {
                    if(transaction == 'undefined'){
                        return false;
                    }
                    else{
                        return transaction[transaction.length-1].createdAt
                    }

                },
                
                max:max
            }
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
    
            return {
                messages: nextTransaction,
                lastDate: nextTransaction[nextTransaction.length-1].createdAt,
                max:max
            }
        }
    }

   catch(error){
        //console.log(error)
       return error
       
   }


}

//getTransaction({id: '62f7fdd597c2ceea6ad4595c',amount: 100,intialRender: true,date: "2022-07-02T17:12:54.407Z"}).then((data)=> console.log(data))

async function test1(){
    let order = await tx.find({'UserID':'62b750b69e2542d58f9721c6'}).sort({$natural:-1}).limit(100)

    console.log(order)
}

//test1()
