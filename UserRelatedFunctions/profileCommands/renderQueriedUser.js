const mongoose = require("mongoose");
const User = require('../../schemas/User')
const followingUnfollowing = require('../../schemas/followerFollowing')
const getUsersPortfolioorandBalance = require('../get/getPortfolioInvestments')

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
module.exports = async function queryUser(jsonInfo){

    let {id, queriedId} = jsonInfo
    try{

        let searchedUser = await User.findById(queriedId)


        searchedUser.phoneNumber = null
        searchedUser.email = null

        //console.log(searchedUser)

        let toIdRelationshipStatus = await followingUnfollowing.exists({userID:queriedId,followerID:id})
        let fromIdRelationshipStatus = await followingUnfollowing.exists({userID:id,followerID:queriedId})

        let showInvestments = searchedUser.private?true:false
        const portfolioInvestments = await getUsersPortfolioorandBalance({id:id,renderAll:showInvestments})
        
        let relationshipStatus = {
            following: toIdRelationshipStatus == null ? false:true,
            followingUser: fromIdRelationshipStatus == null ? false:true,
            mutual: (toIdRelationshipStatus && fromIdRelationshipStatus) ? true:false
        }

        return {userInfo: searchedUser, relationShipStatus:relationshipStatus, portfolioInvestments:portfolioInvestments}

    }

   catch(error){
        console.log(error)
       return error
       
   }


}


async function testing(){
    let result = await User.find();
    console.log(result)
}


//testing()

//queryUser({id:'62f67c52c7ef61f24b5b1888', queriedId:'62f68a6150693c2e9d6bb4bd'})

//followUnfollow({status: 'follow',fromID: '62f67c52c7ef61f24b5b1888',toID:'62f68a6150693c2e9d6bb4bd'})