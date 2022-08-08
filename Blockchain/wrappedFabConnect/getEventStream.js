const axios = require('axios') 



/*
sample curl reequest
curl -X 'POST' \
  'https://u0gqwel2qs-u0f6ogmk5v-connect.us0-aws-ws.kaleido.io/transactions' \
  -H 'accept:
  -H 'Content-Type: application/json' 
  -H 'Authorization: Basic dTBmbmVuNDB5azpMbVFMMjE1MkpRLWxhMDVUb3JOenlteGFvaFpjdUtHdnRJSUEza2dQeGJR' \
  -d '{
  "headers": {
    "type": "SendTransaction",
    "signer": "Emenike",
    "channel": "test",
    "chaincode": "contract"
  },
  "func": "createUser",
  "args": [
    "Emenike"
  ],
  "init": false
}'
*/


async function getEventStream(stream){

    let url;
    if(stream == "all"){
        url = 'https://u0gqwel2qs-u0f6ogmk5v-connect.us0-aws-ws.kaleido.io/eventstreams'
    }
    else{
        url = 'https://u0gqwel2qs-u0f6ogmk5v-connect.us0-aws-ws.kaleido.io/eventstreams/' + stream
    }

    try{
        
        const res = await axios.get(url,{
            headers: {
                'accept': '*/*',
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

getEventStream("all")
