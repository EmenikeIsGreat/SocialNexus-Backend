const mongoose = require("mongoose");
const url = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const message = require('../../Notification/createMessage')
const user = require('../../schemas/User')
const followingUnfollowing = require('../../schemas/followerFollowing')


mongoose.connect(url).then((result) =>{
    console.log("connected")
}).catch((error) =>{
    console.log(error)
})


module.exports = async function followUnfollow(jsonInfo){

    let {status, fromID, toID} = jsonInfo
    let fromFollower = await user.findById(fromID)
    let follower = await user.findById(toID)
    
    if(status == 'follow'){

        fromFollower.following += 1
        follower.followers += 1

        let response = await followingUnfollowing.create({
            userID:fromID,
            followerID:toID
        })

        let messageResponse = await message("SocialNexus",toID,"New Follower")

    }

    else{
        fromFollower.following -= 1
        follower.followers -= 1

        let response = await followingUnfollowing.findOneAndDelete({followerID:toID})
        console.log({response: response})
    }

    let response1 = await fromFollower.save()
    let response2 = await follower.save()

    // console.log(response1)
    // console.log('--------------')
    // console.log(response2)

    return {success: true}
    
}

//followUnfollow({status: 'follow',fromID: '62f68a6150693c2e9d6bb4bd', toID:'62f67c52c7ef61f24b5b1888'})
