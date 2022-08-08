const axios = require('axios') 



/*
sample curl reequest
curl -X 'POST' \
  'https://u0gqwel2qs-u0f6ogmk5v-connect.us0-aws-ws.kaleido.io/eventstreams' \
  -H 'accept: ' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Basic dTBmbmVuNDB5azpMbVFMMjE1MkpRLWxhMDVUb3JOenlteGFvaFpjdUtHdnRJSUEza2dQeGJR' \
  -d '{
  "name": "string",
  "type": "webhook",
  "webhook": {
    "url": "https://webhook.site/b47a3e71-0b82-4123-9ebe-c041444e8831",
    "tlsSkipHostVerify": true
  }
}'
*/


async function createEventStream(eventStreamName, webHookUrl){
    try{
        
        const res = await axios.post('https://u0gqwel2qs-u0f6ogmk5v-connect.us0-aws-ws.kaleido.io/eventstreams',
            {
                "name": eventStreamName,
                "type": "webhook",
                "webhook": {
                    "url":webHookUrl,
                    "tlsSkipHostVerify":true
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

createEventStream("name", "https://webhook.site/b47a3e71-0b82-4123-9ebe-c041444e8831")

