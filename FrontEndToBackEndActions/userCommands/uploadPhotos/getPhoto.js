const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const Path = require('path');


id = "Whatever"

async function getPhotos(id){

    try {
  
      
  
      const resp = await axios.get('http://localhost:5000/userProfile/getPhoto'+id);
  
  
      
      if (resp.status === 200) {
      console.log(resp.data)
     
      return resp.data;

      } 
      } 
    catch(err) {
      console.log(err.message)
      return err.message
      }
  
  
  
  }
  

//getPhotos(id)