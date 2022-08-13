const mongoose = require("mongoose");

const bcrypt = require("bcryptjs")

const url = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"


//const transaction = require('../../Blockchain/wrappedFabConnect/transactions');
const user = require('../schemas/User')
const passwords = require('../schemas/passwords')

const checkIfEmailExist = require('./checkEmailExist')
const checkIfUserNameExist = require('./checkUserNameExist')
const checkIfPhoneNumberExist = require('./checkPhoneNumberExist')

mongoose.connect(url).then((result) =>{
    console.log("connected")
}).catch((error) =>{
    console.log(error)
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
    
    console.log(checkDuplicates)
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

            privacy: false

        })

        console.log("did it work")

        let userID = newUser.id
        console.log(newUser.id)
        let findUser = await user.findById(userID)
        findUser.UserID = userID


        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
              throw saltError
            } else {
              bcrypt.hash(userJson.password, salt, function(hashError, hash) {
                if (hashError) {
                  throw hashError
                } else {
                    
                    let newPassword = passwords.create({
                        ID:userID,
                        encryptedPassword:hash
                    })
                  //$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
                }
              })
            }
          })



        await findUser.save()
        //transaction("Emenike", "test", "contract", "createUser", [userID], true)
        return {userCreated:true}
    }

    catch(error){
        console.log(error)
        return error
    }

}





