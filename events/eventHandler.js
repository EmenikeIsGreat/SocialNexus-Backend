const {MongoClient} = require('mongodb')
const Pusher = require("pusher");
const url = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"


const client = new MongoClient(url)
const pusher = new Pusher({
    appId: "1426906",
    key: "c6cd91c5c5d1d767214c",
    secret: "11b894da88b794ec76e6",
    cluster: "us2",
    useTLS: true
    });


//events: Orders, Bids, ExternalTransfer, messages, create asset, create user=
async function pushTransactionEvents(){

    
    try{

        await client.connect()
        console.log("Message event handler is deployed")

        let db1 = client.db("test").collection("messages")
        
        // watch usersDatabse too implement later

        const changeStreamIterator = db1.watch();


        while(await changeStreamIterator.hasNext()){
            // while the change strea is avalible
            const next = await changeStreamIterator.next();
            console.log(next)

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

pushTransactionEvents()

console.log('-------------------------');

// for tokens
async function liveTokenTracking(){
    
    try{

        await client.connect()
        console.log("event handler is deployed")

        let db = client.db("test").collection('assetprices')

        const changeStreamIterator = db.watch();


        while(await changeStreamIterator.hasNext()){
            // while the change strea is avalible
            const next = await changeStreamIterator.next();
            console.log(next)

            // pasrse event and trigger it as a token not all
            pusher.trigger("testing", "all", {
            message: next.fullDocument
            });
        }

    }
    catch(error){
        console.log(error);
        return error
    }
}

//liveTokenTracking()

async function pushUserEvent(){


    
    try{

        await client.connect()
        console.log("event handler is deployed")

        let db = client.db("test").collection('users')

        const changeStreamIterator = db.watch();


        while(await changeStreamIterator.hasNext()){
            // while the change strea is avalible
            const next = await changeStreamIterator.next();
            
            console.log(next)
            /*
            pusher.trigger("testing", next.fullDocument.UserID, {
            message: next.fullDocument.UserID
            
            }); */
        }

    }
    catch(error){
        console.log(error);
        return error
    }
}

//pushUserEvent()

