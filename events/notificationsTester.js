
/*
  This module is only beneficial to be used with out html and straight javascript,
  but when the front end is integrated you will need to use the actual url: 

  <script src="https://js.pusher.com/7.1/pusher.min.js"></script>

  this link will help: https://dashboard.pusher.com/apps/1426906/getting_started
*/
const Pusher = require("pusher-js");


let pusher = new Pusher('c6cd91c5c5d1d767214c', {
    cluster: 'us2'
  });

  let channel = pusher.subscribe('testing');
  console.log("subscrition had been activated")
  console.log("-------------------------------------")
  

// these binds are all going to the same place so have one bind. I made them seperate for testing

// {orders, Bids Transfers, AssetInit} all of them go through messages, messages, User
channel.bind('Emenike', function(data) {
  console.log("transaction recieved for user Emenike")
  console.log("-------------------------------------")
  console.log(data.message)
})


let token;
//tokens
channel.bind(token, function(data) {
  console.log("transaction recieved for user Emenike")
  console.log("-------------------------------------")
  console.log(data.message)
})









  // write notes for integrastion process for the front end