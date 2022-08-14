const mongoose = require("mongoose");
const user = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const message = require('../../schemas/Message')

mongoose.connect(user).then(()=>{
    console.log("connected")
})
    .catch((error)=>{
        console.log(error)

    })

module.exports = async function getMessage(jsonInfo){

    let {id, amount, initialRender, date} = jsonInfo

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
            }
                }).sort({$natural:-1}).limit(amount)
    
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

//getMessage("Arinze",2,false,"2022-07-01T16:35:04.821Z")

