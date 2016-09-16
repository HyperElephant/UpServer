var express = require('express');
var router = express.Router();
var firebase = require('firebase');

firebase.initializeApp({
  serviceAccount: "serviceAccountCredentials.json",
  databaseURL: "https://you-up-59f97.firebaseio.com/"
});

// Get a database reference to our posts
var db = firebase.database();
var ref = db.ref("inquiry");

// Attach an asynchronous callback to read the data at our reference
ref.on("child_added", function(snapshot) {
  console.log(snapshot.key);
  evaluatePush(snapshot);
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

function evaluatePush(snapshot) {
  //console.log(snapshot);
  setTimeout(push(snapshot), 1000);

}

function push(originalSnapshot){
  ref.child(originalSnapshot.key).once("value", function(snapshot) {
    if(snapshot.val().seen == false){
       console.log("Pushed: ");
    }
  });

}

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
