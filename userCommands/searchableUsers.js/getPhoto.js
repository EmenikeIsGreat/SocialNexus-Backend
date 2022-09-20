
const path = require('path');


const coolPath = path.join(__dirname, '../../.env')
require("dotenv").config({path:coolPath})

console.log(coolPath)
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')



const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY


const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// downloads a file from s3
function getFileStream(fileKey) {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName
    }
    
    let response = s3.getObject(downloadParams).createReadStream()
    console.log(response)
    return response

//getFileStream("Whatever")
}

//getFileStream("hello")

exports.getFileStream = getFileStream
