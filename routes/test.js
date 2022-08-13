const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())


app.get('/test', (req,res)=>{
    res.send("Emenike")
})





let port = 3000
app.listen(port, ()=>{
    console.log('listening on port: ' + port)
})



















