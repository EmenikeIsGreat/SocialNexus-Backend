const axios = require('axios') 



/*
sample curl reequest

curl -X 'GET' \
  'https://u0gqwel2qs-u0f6ogmk5v-connect.us0-aws-ws.kaleido.io/identities' \
  -H 'accept: application/json' \
  -H 'Authorization: Basic dTBmbmVuNDB5azpMbVFMMjE1MkpRLWxhMDVUb3JOenlteGFvaFpjdUtHdnRJSUEza2dQeGJR'

*/
async function getIdentities(){
    try{
        const res = await axios.get('https://u0gqwel2qs-u0f6ogmk5v-connect.us0-aws-ws.kaleido.io/identities', {
          headers: {
            'accept': 'application/json',
            'Authorization': 'Basic dTBmbmVuNDB5azpMbVFMMjE1MkpRLWxhMDVUb3JOenlteGFvaFpjdUtHdnRJSUEza2dQeGJR'
          }
        });
        console.log("success")
        console.log(res.data)
        return res.data
    }
    catch(error){
        console.log("failed")
        console.log(error)
        return error
    }
}

getIdentities()