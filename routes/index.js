const express = require('express')
const bodyParser = require('body-parser')
const createUser = require('../userCommands/initialize/createUser')
const bcrypt = require("bcryptjs")

const settingsRouter = require('./settings')
const userProfileRouter = require('./user')
const processOrder = require('./transaction')
const renderUser = require('../userCommands/initialize/renderUser')
const user = require('../schemas/User')
const passwordCollection = require('../schemas/passwords')


const app = express()

app.use(bodyParser.json())


app.use('/settings', settingsRouter)
app.use('/userProfile', userProfileRouter)
app.use('/processOrder', processOrder)


app.post('/createUser', async (req, res) =>{

    let userJson = req.body
    
    let result = await createUser(userJson);
    console.log(result);
    res.json(result);


    // testing
    // res.send(req.body)
    // res.end()
})


app.post('/signIn', async (req, res) =>{

    let {email, password} = req.body
    console.log("the email to sign in is " + email);

    let potentialUser = await user.findOne({email:email})
    let userID = potentialUser.id;
    
    let encryptedUsers = await passwordCollection.findOne({ID:userID})

    encryptedUsers = encryptedUsers.encryptedPassword
    console.log("encrypted password is " + encryptedUsers)

    
    
    bcrypt.compare(password, encryptedUsers, async function(error, isMatch) {
        if (error) {
            throw error
        } 
        
        else if (!isMatch) {
            console.log("does not matched")
            res.send({valid:false})
        } 
        
        else {
            console.log('matched')
            res.send({valid:true, renderedUser: await renderUser({id:userID})})
        }
    })

})


app.get("/testing",(req,res)=>{
    res.send("Emenike F. Anigbogu");
    console.log("Emenike");
})




let port = 8080
app.listen(port, ()=>{
    console.log('listening on port: ' + port)
})



















