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

    let {id,self} = jsonInfo
    try{

        let renderSpecifications = {id:id, amount:1, initialRender:true, date: null}

        
        console.log(id)
        let user = await User.findById(id)



        const notifications = await getNotifications(renderSpecifications)
        const transactions = await getTx(renderSpecifications)
        //const portfolioInvestments = await getUsersPortfolioorandBalance(id)
        const balance = self ? await getBalance(id):null

        let returnVal = {
            user:user,
            balance:balance,
            notifications: notifications,
            transactions:transactions,
            valid:true,
            //portfolioInvestments: portfolioInvestments
        }

        console.log(returnVal)
        return returnVal;
    }

   catch(error){
       console.log(error)
       return error
   }


}
//renderUser({id:'63b790f4871e180d114f80c6',self:true})

