const axios = require('axios') 



/*
sample curl reequest
curl -X 'GET' \
  'https://u0gqwel2qs-u0f6ogmk5v-connect.us0-aws-ws.kaleido.io/subscriptions' \
  -H 'accept: ' \
  -H 'Authorization: Basic dTBmbmVuNDB5azpMbVFMMjE1MkpRLWxhMDVUb3JOenlteGFvaFpjdUtHdnRJSUEza2dQeGJR'
Request URL
*/


async function getSubscription(stream){

    let url;
    if(stream == "all"){
        url = 'https://u0gqwel2qs-u0f6ogmk5v-connect.us0-aws-ws.kaleido.io/subscriptions'
    }
    else{
        url = 'https://u0gqwel2qs-u0f6ogmk5v-connect.us0-aws-ws.kaleido.io/subscriptions/' + stream
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

getSubscription("all")
