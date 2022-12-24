/*

this watches the messages databse and sends notifcation to user in real time about their messages

*/


const {MongoClient} = require('mongodb')
const Pusher = require("pusher");
const path = require('path');
const pushNotification = require('./pushNotification')

const coolPath = path.join(__dirname, '../.env')
require("dotenv").config({path:coolPath})

const client = new MongoClient(process.env.MONGODB_URL)


//handles notification to users
async function pushTransactionEvents(){

    
    try{

        await client.connect()
        console.log("Message event handler is deployed")

        let db1 = client.db("test").collection("messages")
        

        const changeStreamIterator = db1.watch();


        while(await changeStreamIterator.hasNext()){

            const next = await changeStreamIterator.next();


            pusher.trigger("testing", next.fullDocument.recipient, {
            message: next.fullDocument.body
            });

            pushNotification(next.fullDocument.recipient,next.fullDocument.body)
        }

    }
    catch(error){
        console.log(error);
        return error
    }
}

//pushTransactionEvents()


