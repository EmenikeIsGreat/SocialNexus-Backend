const mongoose = require("mongoose");


const url = "mongodb+srv://Emenike:Ninjaboy12345@cluster0.ehuagp5.mongodb.net/?retryWrites=true&w=majority";


//const transaction = require('../../Blockchain/wrappedFabConnect/transactions');
const user = require('../../schemas/User')
const passwords = require('../../schemas/passwords')
const User_Portfolio = require('../../schemas/userPortfolio')


const checkIfEmailExist = require('../checks/checkEmailExist')
const checkIfUserNameExist = require('../checks/checkUserNameExist')
const checkIfPhoneNumberExist = require('../checks/checkPhoneNumberExist')
const renderUser = require('./renderUser');


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

async function validInputs(userName, phoneNumber, email){

    let inputStatus = {
        email: await checkIfEmailExist(email),
        phoneNumber: await checkIfPhoneNumberExist(phoneNumber),
        userName: await checkIfUserNameExist(userName)
        
    }

    if(!(inputStatus.email && inputStatus.phoneNumber && inputStatus.userName)){
        inputStatus.valid = true;
        return inputStatus
    }
    inputStatus.valid = false
    return inputStatus
}


async function createUser(userJson){
    
    let checkDuplicates = await validInputs(userJson.userName, userJson.phoneNumber, userJson.email)
    
    //console.log(checkDuplicates)
    if(!checkDuplicates.valid){
        return checkDuplicates
    }

    try{
        let newUser = await user.create({

            firstName: userJson.firstName,
        
            lastName:userJson.lastName,

            email:userJson.email,
            
            phoneNumber:userJson.phoneNumber,

            following: 0,

            followers: 0,

            userName: userJson.userName,

            privacy: false,

            Bio:''

        })

        console.log("did it work")

        let userID = newUser.id
        console.log(newUser.id)
        let findUser = await user.findById(userID)
        findUser.UserID = userID
        await User_Portfolio.create({
          userID:"Emenike",
          currentPrice: 0,
          yearlyChart:[0],
          monthlyChart:[0],
          weeklyChart:[0],
          dailyChart:[0],
          minuteChart:[0],
      
          stats:{
              deltaYear:0,
              deltaWeek:0,
              deltaDay:0,
              deltaMonth:0,
          }
      })

        
        let createdUser = await findUser.save()
        //transaction("Emenike", "test", "contract", "createUser", [userID], true)
        let response = await renderUser(userID)
        return {userCreated:response, valid:true}
    }

    catch(error){
        console.log(error)
        return error
    }

}




const userJson = {
  userName:"Emenike12",
  name:"Emenike12",
  phoneNumber:"Emenike12",
  email:"Emenike12",
  password:"Emenike12"
}

async function testing(){
  let result = await user.find();
  console.log(result);
}

//testing();






