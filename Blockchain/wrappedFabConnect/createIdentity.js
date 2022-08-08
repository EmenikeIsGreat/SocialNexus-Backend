const axios = require('axios')

/*
curl request to register identity

curl -X 'POST' \
  'https://u0gqwel2qs-u0f6ogmk5v-connect.us0-aws-ws.kaleido.io/identities' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Basic dTBmbmVuNDB5azpMbVFMMjE1MkpRLWxhMDVUb3JOenlteGFvaFpjdUtHdnRJSUEza2dQeGJR' \
  -d '{
  "name": "Arinze",
  "type": "client",
  "maxEnrollments": 0,
  "attributes": {}
}'
*/

async function registerIdentity(identity){
    try{
        const res = await axios.post('https://u0gqwel2qs-u0f6ogmk5v-connect.us0-aws-ws.kaleido.io/identities', {
            "name": identity,
            "type": "client",
            "maxEnrollments": 0,
            "attributes": {}
          }, {
          headers: {
            // 'application/json' is the modern content-type for JSON, but some
            // older servers may use 'text/json'.
            // See: http://bit.ly/text-json
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic dTBmbmVuNDB5azpMbVFMMjE1MkpRLWxhMDVUb3JOenlteGFvaFpjdUtHdnRJSUEza2dQeGJR'
        
        
          }
        });

        //console.log(res.data)
        return res.data
    }
    catch(error){
        //console.log(error.response.data)
        return error
    }

//console.log(res)
}

//registerIdentity("Emenike4")

/*
curl request to enroll new identity example

curl -X 'POST' \
  'https://u0gqwel2qs-u0f6ogmk5v-connect.us0-aws-ws.kaleido.io/identities/Izunna3/enroll' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Basic dTBmbmVuNDB5azpMbVFMMjE1MkpRLWxhMDVUb3JOenlteGFvaFpjdUtHdnRJSUEza2dQeGJR' \
  -d '{
  "secret": "fUKXENtzJGEZ",
  "attributes": {}
}'


*/



async function enrollIdentity(name, secret){ 
    try{
        let url = 'https://u0gqwel2qs-u0f6ogmk5v-connect.us0-aws-ws.kaleido.io/identities/' + name + '/enroll'
        const res = await axios.post(url, {
            "secret": secret,
            "attributes": {}
          }, {
          headers: {
            // 'application/json' is the modern content-type for JSON, but some
            // older servers may use 'text/json'.
            // See: http://bit.ly/text-json
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic dTBmbmVuNDB5azpMbVFMMjE1MkpRLWxhMDVUb3JOenlteGFvaFpjdUtHdnRJSUEza2dQeGJR'
        
          }
        });
    
        console.log(res.data)
        return res.data
    }
    catch(error){
        //console.log(error.response.data)
        return error
    }

}

//enrollIdentity("Emenike37", "CUtUmtbtJaIG")

async function registerAndEnrollIdentity(name){

    try{
        let identityJson = await registerIdentity(name);
        let enrollJson = await enrollIdentity(identityJson.name,identityJson.secret)
        return enrollJson
    }
    catch(error){
        console.log(error)
        return error
    }
}

registerAndEnrollIdentity("Anigbogu7")

