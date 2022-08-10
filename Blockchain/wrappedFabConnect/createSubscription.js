const axios = require('axios') 



/*
sample curl reequest
curl -X 'POST' \
  'https://u0gqwel2qs-u0f6ogmk5v-connect.us0-aws-ws.kaleido.io/subscriptions' \
  -H 'accept:' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Basic dTBmbmVuNDB5azpMbVFMMjE1MkpRLWxhMDVUb3JOenlteGFvaFpjdUtHdnRJSUEza2dQeGJR' \
  -d '{
  "name": "sub1",
  "stream": "es-aeebdc04-3b27-45bc-784c-02ed4f4c3c71",
  "channel": "test",
  "signer": "contract",
  "fromBlock": "0",
  "payloadType": "json",
  "filter": {
    "blockType": "tx"
  }
}'
*/


async function createSubscription(name, stream, channel, signer, startingBlock){
    try{
        let url = 'https://u0gqwel2qs-u0f6ogmk5v-connect.us0-aws-ws.kaleido.io/subscriptions'
        const res = await axios.post(url,
            {
                "name": name,
                "stream": stream,
                "channel": channel,
                "signer": signer,
                "fromBlock": startingBlock,
                "payloadType": "json",
                "filter": {
                  "blockType": "tx"
                }
            },
            {
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic dTBmbmVuNDB5azpMbVFMMjE1MkpRLWxhMDVUb3JOenlteGFvaFpjdUtHdnRJSUEza2dQeGJR'
                }   
        }
        );
        console.log("success")
        console.log(res.data)
        return res.data
    }
    catch(error){
        console.log("failed")
        console.log(error.response.data)
        return error
    }
}

createSubscription("SocialNexusEvents", "es-cd01d6a5-2ff8-44ac-7938-5b919e2c5fca", "test", "Emenike", "741")
