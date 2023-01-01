const mongoose = require("mongoose");
const User = require('../../schemas/User')

const queryUser = require('../profileCommands/renderQueriedUser')
//get portfolio
const getBalance = require('../get/getUserBalance')
const getNotifications = require('../get/getMessage')
const getTx = require('../get/getTx')
const axios = require('axios')
const getUsersPortfolioorandBalance = require('../get/getPortfolioInvestments')


  

module.exports = async function renderUser(jsonInfo){

    let {id} = jsonInfo
    try{

        let renderSpecifications = {id:id, amount:100, initialRender:true, date: null}

        

        let user = await User.findById(id)
        console.log("this is the user " + user);

        jsonInfo.id = "Emenike"




        const notifications = await getNotifications(renderSpecifications)
        //const transactions = await getTx(renderSpecifications)
        const portfolioInvestments = await getUsersPortfolioorandBalance({id:id,renderAll:true})
        //const balance = await getBalance('getUser', [userID]);

        let returnVal = {
            user:user,
            //balance:balance,
            notifications: notifications,
            //transactions:transactions,
            //profilePic: profilePic.data
            valid:true
        }

        //console.log(returnVal)
        
        return returnVal;
    }

   catch(error){
       console.log(error)
       return error
   }


}
//renderUser({id:'633cd5110f3f0c5c4825c83f'})

