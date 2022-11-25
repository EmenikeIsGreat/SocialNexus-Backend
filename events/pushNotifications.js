/*

this watches the messages databse and sends notifcation to user in real time about their messages

*/


const {MongoClient} = require('mongodb')
const Pusher = require("pusher");
const path = require('path');

const coolPath = path.join(__dirname, '../.env')
require("dotenv").config({path:coolPath})

const client = new MongoClient(process.env.MONGODB_URL)


const pusher = new Pusher({
    appId: "1426906",
    key: "c6cd91c5c5d1d767214c",
    secret: "11b894da88b794ec76e6",
    cluster: "us2",
    useTLS: true
    });


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
        }

    }
    catch(error){
        console.log(error);
        return error
    }
}

//pushTransactionEvents()


