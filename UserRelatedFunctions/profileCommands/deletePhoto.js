require('dotenv').config()
const path = require('path');


const coolPath = path.join(__dirname, '../../.env')
require("dotenv").config({path:coolPath})


const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')



const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY



async function deletePhoto(key){
  console.log("YOOOOOOOO")
    const s3 = new S3({
        region,
        accessKeyId,
        secretAccessKey
      })
      
      const params = {
          Bucket: bucketName,
          Key:key 
        };
        
        await s3.deleteObject(params, function(err, data) {
          console.log(data)
        }).promise()



}



//deletePhoto("6382725ccf26091d21536496")

exports.deletePhoto = deletePhoto

