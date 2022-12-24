const express = require('express')
const bodyParser = require('body-parser')
const createUser = require('../UserRelatedFunctions/createOrRenderUser/createUser')
const bcrypt = require("bcryptjs")

const settingsRouter = require('./settings')
const userProfileRouter = require('./user')
const processOrder = require('./transaction')
const renderUser = require('../UserRelatedFunctions/createOrRenderUser/renderClient')
const user = require('../schemas/User')
const passwordCollection = require('../schemas/passwords')
const http = require('http');
const socket = require("socket.io")
const httpServer = http.createServer();

const app = express()

app.use(bodyParser.json())


app.use('/settings', settingsRouter)
app.use('/userProfile', userProfileRouter)
app.use('/processOrder', processOrder)


app.post('/createUser', async (req, res) =>{

    let userJson = req.body
    let result = await createUser(userJson);
    console.log("----------------")
    console.log("result is " + result)
    console.log("----------------")

    res.json(result);
    res.end();


    // testing
    // res.send(req.body)
})


app.post('/signIn', async (req, res) =>{

    let {email, password} = req.body

    let potentialUser = await user.findOne({email:email})
    let userID = potentialUser.id;
    
    let encryptedUsers = await passwordCollection.findOne({user:userID})

    encryptedUsers = encryptedUsers.encryptedPassword
    
    
    bcrypt.compare(password, encryptedUsers, async function(error, isMatch) {
        if (error) {
            console.log(error);
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



const Server = require("socket.io")
const io = new Server.Server(httpServer, {
});


module.exports = function emitEvent(topic,message){
   io.sockets.emit(topic, message);
}

let port = 8080

httpServer.listen(port);


app.listen(port, ()=>{
    console.log('listening on port: ' + port)
})



















