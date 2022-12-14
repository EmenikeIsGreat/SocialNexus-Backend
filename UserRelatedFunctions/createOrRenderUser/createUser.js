const mongoose = require("mongoose");




//const transaction = require('../../Blockchain/wrappedFabConnect/transactions');
const user = require('../../schemas/User')
const passwords = require('../../schemas/passwords')
const User_Portfolio = require('../../schemas/userPortfolio')


const checkIfEmailExist = require('../doesExist/checkEmailExist')
const checkIfUserNameExist = require('../doesExist/checkUserNameExist')
const checkIfPhoneNumberExist = require('../doesExist/checkPhoneNumberExist')
const transaction = require('../../Blockchain/wrappedFabConnect/transactions')

const renderUser = require('./renderClient');
const bcrypt = require("bcryptjs")
const saltRounds = 10;

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

module.exports = async function createUser(userJson){
    
    let checkDuplicates = await validInputs(userJson.userName, userJson.phoneNumber, userJson.email)
    if(!checkDuplicates.valid){

        return {valid:false}
    }
    try{
        // create user in user database
        let newUser = await user.create({

            firstName: userJson.firstName,
        
            lastName:userJson.lastName,

            email:userJson.email,
            
            phoneNumber:userJson.phoneNumber,

            following: 0,

            followers: 0,

            userName: userJson.userName,

            privacy: false,

            Bio:'no bio yet',

            hasProfilePic: false

        })

        bcrypt.hash(userJson.password, saltRounds, async function(err, hash) {
            
            const encrypt = await passwords.create({
                user:newUser.id,
                encryptedPassword:hash
            })

            //console.log("encryption: " + hash);        
        });


        let userID = newUser.id
        console.log(userID);
        
        // createss user portfolio
        await User_Portfolio.create({
          active:false,
          userID:userID,
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


         // create user on the blockchain
        // once you activate the blockchain uncomment this
        
        await transaction("createUser", [userID])
        let response = await renderUser({id:userID})
        response.valid = true
        console.log(response);
        return response;
    }

    catch(error){
        console.log(error)
    }

}




const userJson = {
    firstName:"Emenike",
    lastName:"Anigbogu",
    userName:"EmenikeV1",     
    name:"Emenike",
    phoneNumber:"6172869618",
    email:"emenikeani333@gmail.com",
    password:"socialnexus"
}

//createUser(userJson)

// let {userName,email,phoneNumber} = userJson
// validInputs(userName, phoneNumber, email).then((data)=>{
//     console.log(data)
// }).catch((error)=>{
//     console.log(error)
// })

// createUser(userJson).then((data)=>console.log(data))
// .catch((error)=>console.log(error))

//createUser(userJson);




async function testing(){
  let result = await user.findOne({id:"634e06bf2bdbdf13361d940a"});
  console.log(result);
}

//testing();






