const express = require('express')
const bodyParser = require('body-parser')

const settingsRouter = require('./settings')
const userProfileRouter = require('./user')
const processOrder = require('./collisions')
const renderUser = require('../userCommands/initialize/renderUser')


const app = express()

app.use(bodyParser.json())


app.use('/settings', settingsRouter)
app.use('/userProfile', userProfileRouter)
app.use('/processOrder', processOrder)

app.post('/renderUser',(req,res)=>{
    let response = renderUser(req.body).then((data)=>{
        //console.log(data)
        res.send(data)
        res.end()
    }).catch((error)=>{
        console.log(error)
        res.end()
    })
})





let port = 5000
app.listen(port, ()=>{
    console.log('listening on port: ' + port)
})



















