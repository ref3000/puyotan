import React from 'react';
import './App.css';
import ChatBox from './ChatBox';

import firebase from 'firebase/app';
import 'firebase/firestore';

import imgFieldBack from '../assets/puyo_field_back.png';

import Game from '../lib/Game';

//インスタンスの初期化
firebase.initializeApp({
  apiKey: "AIzaSyDNckvdwFU9B-Xg3YPY-tgsrj09kg0MTxE",
  authDomain: "puyotan-be458.firebaseapp.com",
  databaseURL: "https://puyotan-be458.firebaseio.com",
  projectId: "puyotan-be458",
  storageBucket: "puyotan-be458.appspot.com",
  messagingSenderId: "1067679324903"
});

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

const a = [{ n: 1 }, { n: 3 }, { n: 5 }, { n: 2 }];
a.sort((a, b) => a.n - b.n);
console.log(a);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatObjs: []
    }
    db.collection("comments").onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.filter((v) => !v.metadata.hasPendingWrites).map((v) => {
        const data = v.data();
        return {
          name: data.name,
          text: data.text,
          updatedAt: data.updatedAt != null ? data.updatedAt.seconds : (new Date().getTime() / 1000)
        }
      });
      data.sort((a, b) => {
        return a.updatedAt - b.updatedAt
      });
      this.setState({
        chatObjs: data
      });
    });
  }

  componentDidUpdate() {
    const ctx1 = this.refs.canvas1.getContext('2d');
    const ctx2 = this.refs.canvas2.getContext('2d');

    const image = new Image();
    image.onload = () => {
      ctx1.drawImage(image, 0, 0);
      ctx2.drawImage(image, 0, 0);
    }
    image.src = imgFieldBack;
  }

  render() {
    console.log('render');

    var list = this.state.chatObjs.map((v, i) => <p key={i}>{v.name}: {v.text} :{v.updatedAt}</p>);

    return (
      <div className="App">
        <h1>ぷよたんテスト</h1>
        <canvas ref="canvas1" width="192px" height="416px" className="canvasField"></canvas>
        <canvas ref="canvas2" width="192px" height="416px" className="canvasField"></canvas>
        {list}
        <ChatBox onButtonClick={this.onButtonClick} />
      </div>
    );
  }

  onButtonClick = (chatObj) => {
    const cvs = this.refs.canvas;
    console.log(cvs)
    console.log(chatObj);
    this.setState({
      chatObjs: this.state.chatObjs.concat(chatObj)
    });
    db.collection("comments").add({
      name: chatObj.name,
      text: chatObj.text,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }
}
