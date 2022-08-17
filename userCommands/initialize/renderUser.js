const mongoose = require("mongoose");
const user = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const User = require('../../schemas/User')

const queryUser = require('../searchableUsers.js/queryUser')
//get portfolio
const getBalance = require('../queries.js/getUserBalance')
const getNotifications = require('../queries.js/getMessage')
const getTx = require('../queries.js/getTx')
const {getFileStream} = require('../searchableUsers.js/getPhoto')
const axios = require('axios')



  


module.exports = async function renderUser(jsonInfo){

    let {id} = jsonInfo
    try{

        let renderSpecifications = {id:id, amount:100, initialRender:true, date: null}

        

        let user = await User.findById(id)
        
        // temporary
        jsonInfo.id = "Emenike"



        const resp = await axios.get('http://localhost:5000/userProfile/getPhoto'+id);
  
  

        if (resp.status === 200) {
            console.log(resp.data)

        } 

        let balance = await getBalance(jsonInfo)
        let notifications = await getNotifications(renderSpecifications)
        let transactions = await getTx(renderSpecifications)
        //let photoData = await getFileStream("hello")


        let returnVal = {
            user:user,
            balance:balance,
            notifications: notifications,
            transactions:transactions,
            profilePic: resp.data
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

