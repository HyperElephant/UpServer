var express = require('express');
var router = express.Router();
var firebase = require('firebase');


firebase.initializeApp({
  serviceAccount: "serviceAccountCredentials.json",
  databaseURL: "https://you-up-59f97.firebaseio.com/"
});

// Get a database reference to our posts
var db = firebase.database();
var ref = db.ref("ups");

// Attach an asynchronous callback to read the data at our reference
ref.on("value", function(snapshot) {
  console.log(snapshot.val());
  setTimeout(evaluatePush(snapshot), 30000);
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

function evaluatePush(snapshot) {
  if (snapshot.child("seen") == false) {
    push(snapshot);
  }
}

function push(snapshot){
  console.log("Pushed: " + snapshot.key);
}


/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
