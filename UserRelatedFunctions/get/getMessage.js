const mongoose = require("mongoose");
const message = require('../../schemas/Message')


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

// retrieves users messages
module.exports = async function getMessage(jsonInfo){

    let {id, amount, initialRender, date} = jsonInfo

    doesUserExist = await message.findById(id);
    //console.log(doesUserExist);
    if(doesUserExist == null){
        return null;
    }

    try{
        if(initialRender){
            let renderMessages = await message.find({'recipient':id}).sort({$natural:-1}).limit(amount)
            //console.log(renderMessages)
            return {
                messages: renderMessages,
                lastDate: renderMessages[renderMessages.length-1].createdAt
            }
        }
    
        else{
            let nextMessages = await message.find({"recipient":id,
            createdAt: {
                $lte: new Date(date)
            }})
           //     }).sort({$natural:-1}).limit(amount)
    
            //console.log(nextMessages)
    
            return {
                messages: nextMessages,
                lastDate: nextMessages[nextMessages.length-1].createdAt
            }
        }
    }

        
   catch(error){
       return error
   }


}

//WgetMessage("Arinze",2,false,"2022-07-01T16:35:04.821Z")

