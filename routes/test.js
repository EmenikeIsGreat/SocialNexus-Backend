const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())


app.get('/test', (req,res)=>{
    res.send("Emenike")
    console.log("Hello");
})





















