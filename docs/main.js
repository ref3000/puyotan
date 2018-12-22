// Initialize Firebase
var config = {
  apiKey: "AIzaSyDNckvdwFU9B-Xg3YPY-tgsrj09kg0MTxE",
  authDomain: "puyotan-be458.firebaseapp.com",
  databaseURL: "https://puyotan-be458.firebaseio.com",
  projectId: "puyotan-be458",
  storageBucket: "puyotan-be458.appspot.com",
  messagingSenderId: "1067679324903"
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

db.collection("rooms").doc("1").collection("chats")
  .onSnapshot(function (querySnapshot) {
    clearChatArea();
    querySnapshot.docs.forEach(element => {
      var data = element.data();
      addChatArea(data);
    });
  });

function clearChatArea() {
  document.querySelector('#chat-area').textContent = null;
}

function addChatArea(data) {
  var p = document.createElement('p');
  p.textContent = data.value;
  document.querySelector('#chat-area').append(p);
}

document.querySelector('#submit-button').addEventListener('click', function (e) {
  var value = document.querySelector('#value').value
  console.log(value);
  db.collection("rooms").doc("1").collection("chats").add({
    name: "unchi",
    value: value
  })
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
});

// Add a new document in collection "cities"
// db.collection("chat").doc("room1").set({
//   name: "unchi",
//   value: "こんにちは今日も一日頑張っていきあm症"
// })
//   .then(function () {
//     console.log("Document successfully written!");
//   })
//   .catch(function (error) {
//     console.error("Error writing document: ", error);
//   });

// db.collection("chat").add({
//   first: "Ada",
//   last: "Lovelace",
//   born: 1815
// })
//   .then(function (docRef) {
//     console.log("Document written with ID: ", docRef.id);
//   })
//   .catch(function (error) {
//     console.error("Error adding document: ", error);
//   });