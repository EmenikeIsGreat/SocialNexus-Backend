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


//handles notification to users
async function pushTransactionEvents(){

    
    try{

        await client.connect()
        console.log("Message event handler is deployed")

        let db1 = client.db("test").collection("messages")
        

        const changeStreamIterator = db1.watch();


        while(await changeStreamIterator.hasNext()){
            // while the change strea is avalible
            const next = await changeStreamIterator.next();
            //console.log(next)

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

