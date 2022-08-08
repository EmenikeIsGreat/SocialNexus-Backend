const axios = require('axios') 
const stringify  = require('json-stringify-deterministic');


/*
sample curl reequest
curl -X 'POST' \
  'https://u0gqwel2qs-u0f6ogmk5v-connect.us0-aws-ws.kaleido.io/query' \
  -H 'accept: 
  -H 'Content-Type: application/json' 
  -H 'Authorization: Basic dTBmbmVuNDB5azpMbVFMMjE1MkpRLWxhMDVUb3JOenlteGFvaFpjdUtHdnRJSUEza2dQeGJR' \
  -d '{
  "headers": {
    "signer": "Emenike",
    "channel": "test",
    "chaincode": "contract"
  },
  "func": "getUser",
  "args": [
    "Emenike"
  ],
  "strongread": true
}'
*/


module.exports = async function query(signer, channel, contract, func, args){
    try{
        
        const res = await axios.post('https://u0gqwel2qs-u0f6ogmk5v-connect.us0-aws-ws.kaleido.io/query',
            {
                "headers": {
                  "signer": signer,
                  "channel": channel,
                  "chaincode": contract
                },
                "func": func,
                "args":args,
                "strongread": true
              },{
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': 'Basic dTBmbmVuNDB5azpMbVFMMjE1MkpRLWxhMDVUb3JOenlteGFvaFpjdUtHdnRJSUEza2dQeGJR'
              }   
        }
        );
        console.log("success")
        //console.log(res.data)
        return res.data
    }
    catch(error){
        console.log("failed")
        console.log(error.response.data)
        return error
    }
}

//query("Emenike", "test", "contract", "getOrder", ["Emenike32222"])
//query("Emenike", "test", "contract", "getUser", ["62bf5a2abd0ed4455548ffcd"])
query("Emenike", "test", "contract", "getAsset", ["testCoin4"])