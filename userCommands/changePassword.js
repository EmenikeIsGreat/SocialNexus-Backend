const mongoose = require("mongoose");
const url = "mongodb+srv://Emenike:Ninjaboy12345$@cluster0.lc7v34m.mongodb.net/?retryWrites=true&w=majority"
const Password = require('../schemas/passwords')
const bcrypt = require("bcryptjs")
const Pusher = require("pusher");




mongoose.connect(url).then(()=>{
    console.log("connected")
})
    .catch((error)=>{
        console.log('error')
        console.log(error)

    })

module.exports = async function changePassword(jsonInfo){

  
  const pusher = new Pusher({
    appId: "1426906",
    key: "c6cd91c5c5d1d767214c",
    secret: "11b894da88b794ec76e6",
    cluster: "us2",
    useTLS: true
    });


    let {id, password, newPassword} = jsonInfo
    let hashPassJson = await Password.findOne({ID:id})
    let hashPass = hashPassJson.encryptedPassword

    console.log("old Passcode: " + hashPass)

    bcrypt.compare(password, hashPass, function(error, isMatch) {
        if (error) {
        throw error
        } else if (!isMatch) {
        console.log("Password doesn't match!")
        pusher.trigger("testing", id, {request:"password changed", status: false})
        return false
        } else {
        console.log("Password matches!")

        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
              throw saltError
            } else {
              bcrypt.hash(newPassword, salt, function(hashError, hash) {
                if (hashError) {
                  throw hashError
                } else {
                    
                    hashPassJson.encryptedPassword = hash
                    async function saveToDatabase(){
                        let response = await hashPassJson.save();
                    }
                    saveToDatabase()
                    pusher.trigger("testing", id, {request:"password changed", status: true})

                }
              })
            }
          })

        }
    })



    return hashPass

}

//changePassword({id: '62f6c7282be968830f9ab3f3', password: 'testies', newPassword:'borgov'})

