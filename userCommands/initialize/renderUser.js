const mongoose = require("mongoose");
const user = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"

const queryUser = require('../searchableUsers.js/queryUser')
//get portfolio
const getBalance = require('../queries.js/getUserBalance')
const getNotifications = require('../queries.js/getMessage')
const getTx = require('../queries.js/getTx')
const {getPhoto} = require('./getPhoto')



module.exports = async function renderUser(jsonInfo){

    let {id} = jsonInfo
    try{

        let renderSpecifications = {id:id, amount:100, initialRender:true, date: null}

        
        let user = await queryUser(jsonInfo)
        
        jsonInfo.id = "Emenike"
        let balance = await getBalance(jsonInfo)
        let notifications = await getNotifications(renderSpecifications)
        let transactions = await getTx(renderSpecifications)
        let photoData = await getPhoto(queriedId)


        let returnVal = {
            user:user,
            balance:balance,
            notifications: notifications,
            transactions:transactions,
            profilePic: photoData
        }

        console.log(returnVal)
        
        return returnVal
    }

   catch(error){
       console.log(error)
       return error
   }


}

//renderUser({id:'62f7fdd597c2ceea6ad4595c'})

