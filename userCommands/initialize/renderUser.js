const mongoose = require("mongoose");
const User = require('../../schemas/User')

const queryUser = require('../searchableUsers.js/queryUser')
//get portfolio
const getBalance = require('../queries.js/getUserBalance')
const getNotifications = require('../queries.js/getMessage')
const getTx = require('../queries.js/getTx')
const {getFileStream} = require('../searchableUsers.js/getPhoto')
const axios = require('axios')
const getUsersPortfolioorandBalance = require('../queries.js/getPortfolioInvestments')


  

module.exports = async function renderUser(jsonInfo){

    let {id} = jsonInfo
    try{

        let renderSpecifications = {id:id, amount:100, initialRender:true, date: null}

        

        let user = await User.findById(id)
        
        // temporary
        jsonInfo.id = "Emenike"



  

        //const balance = await getBalance(jsonInfo)
        const notifications = await getNotifications(renderSpecifications)
        const transactions = await getTx(renderSpecifications)
        //const profilePic = await axios.get('http://localhost:5000/userProfile/getPhoto'+id);
        const portfolioInvestments = await getUsersPortfolioorandBalance({id:id,renderAll:true})
        //const balance = await getBalance('getUser', [userID]);

        let returnVal = {
            user:user,
            //balance:balance,
            notifications: notifications,
            transactions:transactions,
            //profilePic: profilePic.data
        }

        //console.log(returnVal)
        
        return returnVal
    }

   catch(error){
       console.log(error)
       return error
   }


}

//renderUser({id:'633cd5110f3f0c5c4825c83f'})

