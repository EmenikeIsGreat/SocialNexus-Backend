const axios = require('axios') 
const stringify  = require('json-stringify-deterministic');


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


async function transaction(signer, channel, contract, func, args, sync){
    let url = 'https://u0gqwel2qs-u0f6ogmk5v-connect.us0-aws-ws.kaleido.io/transactions?fly-sync=' + sync
    try{
        
        const res = await axios.post(url,
            {
                "headers": {
                    "type": "SendTransaction",
                    "signer": signer,
                    "channel": channel,
                    "chaincode": contract
                },
                "func": func,
                "args":args,
                "init": false
              },{
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


let testOrder = stringify([
  {
    id:"12345",
    userID: "Emenike2",
    assetID: "testCoin",
    orderType: "Buy",
    tokenAmount: 1,
    strikePrice: 90,
    slippage: 300000000
  }
])


let testOrder4 = stringify([
  {
    id:"12345",
    userID: "Emenike2",
    assetID: "testCoin",
    usdsn: 3000
  }
])

//transaction("Emenike", "test", "contract", "executeOrder", ["testCoin", testOrder], true)
transaction("Emenike", "test", "contract", "createUser", ['EmenikeV2'], true)
//transaction("Emenike", "test", "contract", "deposit", ["Emenike2", "10000000000", "true"], true)
//transaction("Emenike", "test", "contract", "initalizeAssets", ["testCoin"], true)

