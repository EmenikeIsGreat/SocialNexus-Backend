const transaction = require('../../wrappedFabConnect/transactions')
const stringify  = require('json-stringify-deterministic');
let json = []
let num = 0;
for(i = 0; i < 1000; i++){
    let val = {
        name:"Emenike",
        age: num
    }
    num++
    json.push(val)
}

//console.log(json)
let val = {
    name:"Emenike"
}
val = stringify(val)
//val = stringify(val)
//console.log(val)

//console.log(json)

transaction("Emenike","test","contract","testing",[stringify(json)],true)