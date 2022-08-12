const express = require('express')
const bodyParser = require('body-parser')

const assetRouter = require('./asset')
const settingsRouter = require('./settings')
const userProfileRouter = require('./user')



const app = express()

app.use(bodyParser.json())

app.use('./asset', assetRouter)
app.use('./settings',settingsRouter)
app.use('./userProfile', userProfileRouter)







let port = 3000
app.listen(()=>{
    console.log('listening on port: ' + port)
    return port
})