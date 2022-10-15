


let leadingDigits = [1,2,3,4,5,6,7,8,9]
let occurences = [0,0,0,0,0,0,0,0,0]

let sampleData = [50,43,104,202]

for(i = 0; i < sampleData.length;i++){
    for(k = 0; k < leadingDigits.length;k++){

        if(parseInt(sampleData[i].toString()[0]) == leadingDigits[k]){
  
            occurences[k] = occurences[k]+1;
            break;
        }
    }
}

console.log(occurences)