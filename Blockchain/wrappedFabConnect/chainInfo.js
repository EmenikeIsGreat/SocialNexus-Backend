const axios = require('axios') 



/*
sample curl reequest
curl -X 'GET' \
  'https://u0gqwel2qs-u0f6ogmk5v-connect.us0-aws-ws.kaleido.io/chaininfo?fly-channel=test&fly-signer=Emenike' \
  -H 'accept: application/json' \
  -H 'Authorization: Basic dTBmbmVuNDB5azpMbVFMMjE1MkpRLWxhMDVUb3JOenlteGFvaFpjdUtHdnRJSUEza2dQeGJR'
*/


module.exports = async function chainInfo(signer,dataAmount){
    let url = 'https://u0gqwel2qs-u0f6ogmk5v-connect.us0-aws-ws.kaleido.io/chaininfo?fly-channel=test&fly-signer=' + signer
    try{
        
        const res = await axios.get(url,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic dTBmbmVuNDB5azpMbVFMMjE1MkpRLWxhMDVUb3JOenlteGFvaFpjdUtHdnRJSUEza2dQeGJR'
              }   
        }
        );
        //console.log("success")
        //console.log(res.data.result)
        if(dataAmount == "all"){
            return res.data.result
        }
        else{
            return res.data.result.height
        }
    }
    catch(error){
        console.log("failed")
        console.log(error.response.data)
        return error
    }
}

//chainInfo("Emenike")

//module.exports = chainInfo()


