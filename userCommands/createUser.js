const mongoose = require("mongoose");
const url = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
//const transaction = require('../../Blockchain/wrappedFabConnect/transactions');
const user = require('../schemas/User')
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

    return inputStatus
}

async function createUser(userJson){
    
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

            // encrypt password
            password:userJson.password

        })
        console.log("did it work")

        let userID = newUser.id
        console.log(newUser.id)
        let findUser = await user.findById(userID)
        findUser.UserID = userID
        await findUser.save()
        //transaction("Emenike", "test", "contract", "createUser", [userID], true)
    }

    catch(error){
        console.log(error)
        return error
    }

}


let userJson = {
        
    firstName: "Emenike",
    
    lastName:"Anigbogu",

    email:"emenike@email1",
    
    phoneNumber:"61728696101",

    password:"Ninjaboy12345",

    userName: "EmenikeCool"
} 

createUser(userJson)


async function test1(){
    let userJson = {
        
        firstName: "Emenike",
        
        lastName:"Anigbogu",

        email:"emenike@email32",
        
        phoneNumber:"6172869610",

        password:"Ninjaboy12345",

        userName: "EMenikeCOol"
    } 

    let newUser = await user.create({

        firstName: userJson.firstName,
    
        lastName:userJson.lastName,

        email:userJson.email,
        
        phoneNumber:userJson.phoneNumber,

        password:userJson.password,

        userName: userJson.userName

    })

    console.log(newUser)


}

//test1()

async function test2(){
    let findUser = await checkIfEmailExist("emenike@email32")
    console.log(findUser)

    let findUser2 = await checkIfPhoneNumberExist("6172869610")
}

//test2()

async function test3(){


    let userJson = {
        
        firstName: "Emenike",
        
        lastName:"Anigbogu",

        email:"emenike@email32",
        
        phoneNumber:"6172869610",

        password:"Ninjaboy12345"
    } 


    let newUser = await user.create({

        firstName: userJson.firstName,
    
        lastName:userJson.lastName,

        email:userJson.email,
        
        phoneNumber:userJson.phoneNumber,

        password:userJson.password

    })
    let userID = newUser.id
    let findUser = await user.findById(userID)
    console.log(findUser)
    findUser.UserID = userID
    await findUser.save()

    let findUser2 = await user.findById(userID)
    console.log(findUser2)
}

//test3()