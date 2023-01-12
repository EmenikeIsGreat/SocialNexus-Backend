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
    console.log(jsonInfo)
    console.log('---------------')
    let {id,self} = jsonInfo
    try{

        let renderSpecifications = {id:id, amount:5, initialRender:true, date: null}

        
        console.log(id)
        let user = await User.findById(id)




        const notifications = await getNotifications(renderSpecifications)
        const transactions = await getTx(renderSpecifications)
        //console.log(transactions);
        const portfolioInvestments = await getUsersPortfolioorandBalance(id)
        const balance = self ? await getBalance(id):null

        let returnVal = {
            user:user,
            balance:balance,
            notifications: notifications,
            transactions:transactions,
            valid:true,
            portfolio: portfolioInvestments
        }


        console.log("---------ouput----------")
        console.log(returnVal)
        console.log("---------ouput----------")
        return returnVal;
    }

   catch(error){
       console.log(error)
       return error
   }


}
//renderUser({id:'63bf13f5f8086e6fe2c9d2b6',self:true})

