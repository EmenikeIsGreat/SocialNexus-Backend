const express = require('express')
const bodyParser = require('body-parser')

const settingsRouter = require('./settings')
const userProfileRouter = require('./user')
const processOrder = require('./collisions')



const app = express()

app.use(bodyParser.json())


app.use('/settings', settingsRouter)
app.use('/userProfile', userProfileRouter)
app.use('/processOrder', processOrder)







let port = 3000
app.listen(port, ()=>{
    console.log('listening on port: ' + port)
})



















