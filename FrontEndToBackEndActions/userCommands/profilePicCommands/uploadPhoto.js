const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const Path = require('path');




const upload = async (id) => {
    try {

    
      const coolPath = Path.join(__dirname, './umd.jpg');
      const file = fs.createReadStream(coolPath);
      
      const title = 'My file';
    
      const form = new FormData();


      form.append('title', title);
      form.append('file', file);




      const resp = await axios.post('http://35.172.193.5:8080/userProfile/changePhoto'+id, form,
      { headers: {'Content-Type': 'multipart/form-data'}});

      if (resp.status === 200) {
      return 'Upload complete';
      } 
      } 
    catch(err) {
      console.log(err.message)
      return err.message
      }
    }
  
upload(id).then(resp => console.log(resp));


