const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())


app.get('/test', (req,res)=>{
    res.send("Emenike")
    console.log("Hello");
})

app.post('/test2', (req,res)=>{
    res.json({data:("THis is the data you sent back: " + res.data)});
    console.log("Hello");
})



let port = 8080
app.listen(port,()=>{
    console.log("listening on port: " + port)
})




















