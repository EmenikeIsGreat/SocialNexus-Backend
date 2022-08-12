const mongoose = require("mongoose");
const url = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const message = require('../Notification/createMessage')
const user = require('../schemas/User')


mongoose.connect(url).then((result) =>{
    console.log("connected")
}).catch((error) =>{
    console.log(error)
})


async function followUnfollow(status, fromID, toID){

    let fromFollower = await user.findById(fromID)
    let follower = await user.findById(toID)
    
    if(status == 'follow'){

        fromFollower.following += 1
        follower.followers += 1
        let messageResponse = await message("SocialNexus",toID,"New Follower")

    }

    else{
        fromFollower.following -= 1
        follower.followers -= 1
    }

    let response1 = await fromFollower.save()
    let response2 = await follower.save()

    console.log(response1)
    console.log('--------------')
    console.log(response2)
    
}

followUnfollow('follow','62c0eadc47ec21fd9e585023','62c0eadc47ec21fd9e585023')
