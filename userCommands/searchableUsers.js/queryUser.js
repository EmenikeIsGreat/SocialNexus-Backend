const mongoose = require("mongoose");
const user = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const User = require('../../schemas/User')
const followingUnfollowing = require('../../schemas/followerFollowing')

const getUsersPortfolioorandBalance = require('../queries.js/getPortfolioInvestments')

mongoose.connect(user).then(()=>{
    console.log("connected")
})
    .catch((error)=>{
        console.log(error)

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
        const resp = await axios.get('http://localhost:5000/userProfile/getPhoto'+id);
        let photoData = await resp.data

        console.log({userInfo: searchedUser, relationShipStatus:relationshipStatus, profilePic: photoData})
        return {userInfo: searchedUser, relationShipStatus:relationshipStatus, portfolioInvestments:portfolioInvestments}

    }

   catch(error){
        console.log(error)
       return error
       
   }


}

//queryUser({id:'62f67c52c7ef61f24b5b1888', queriedId:'62f68a6150693c2e9d6bb4bd'})

//followUnfollow({status: 'follow',fromID: '62f67c52c7ef61f24b5b1888',toID:'62f68a6150693c2e9d6bb4bd'})