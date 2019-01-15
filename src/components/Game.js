import React from "react";
import './Game.css';
import Puyo from '../lib/Puyo.js';
import Puyotan from '../lib/Puyotan.js';

import firebase from 'firebase/app';
import 'firebase/firestore';

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

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.puyotan = new Puyotan.Puyotan();
    let vm = this.puyotan.getViewModel();
    this.state = {
      controledPos1: 0,
      controledDir1: 0,
      controledPos2: 0,
      controledDir2: 0,
      isControlledPlayer1: true,
      isControlledPlayer2: true,
    };
    Object.assign(this.state, this.puyotanViewModelToStateObject(vm));
    this.isControllable = true;

    // keyboard 操作用
    window.addEventListener('keydown', e => {
      e.preventDefault();
      if (!this.isControllable) return;
      switch (e.keyCode) {
        case 37: // ←キー
          this.moveLeft();
          return
        case 39: // →キー
          this.moveRight();
          return
        case 38: // ↑キー
          return
        case 40: // ↓キー
          this.putPuyo();
          return
        case 49: // 1
          this.toggleControlledPlayer1();
          return
        case 50: // 2
          this.toggleControlledPlayer2();
          return
        case 51: // 3
          return
        case 52: // 4
          return
        case 53: // 5
          return
        case 54: // 6
          return
        case 55: // 7
          return
        case 56: // 8
          return
        case 88: // x
          this.turnRight();
          return
        case 90: // z
          this.turnLeft();
          return
        case 67: // c
          return
        case 68: // d
          return
        case 69: // e
          return
        case 78: // n
          this.stepNextFrame();
          return
        case 80: // p
          this.pass();
          return
        case 82: // r
          return
        case 83: // s
          this.gameStart();
          return
        case 84: // t
          return
        default:
          return;
      }
    })

    // firestore 監視用
    // let ref = db.collection("puyotan").doc('player1');
    // ref.orderBy('')
    db.collection("puyotan/histories/0").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (String(this.state.frame) === doc.id) {
          this.setAction(0, doc.data(), this.state.frame, false);
        }
      });
    });
    db.collection("puyotan/histories/1").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (String(this.state.frame) === doc.id) {
          this.setAction(1, doc.data(), this.state.frame, false);
        }
      });
    });
  }

  render() {
    return (
      <div className="Game" >
        <div className={`Game-history Game-pos-history1`}>
          {this.actionHistoriesToElements(this.state.actionHistories1)}
        </div>
        <div className={`Game-history Game-pos-history2`}>
          {this.actionHistoriesToElements(this.state.actionHistories2)}
        </div>
        <div className={"Game-field Game-pos-field1" + (this.state.isControlledPlayer1 ? " Game-field-active" : "")}>
          {this.fieldToElements(this.state.field1)}
          <div style={({ top: 32 * (10 - this.getSubPos1().y), left: 32 * (this.getSubPos1().x - 1) })} className={`Game-puyo ${this.kindToClassName(this.state.activePair1.sub)} ${this.state.actionHistories1[this.state.frame] != null || !this.state.isControlledPlayer1 ? "hidden" : ""}`}></div>
          <div style={({ top: 32 * (10 - this.getAxisPos1().y), left: 32 * (this.getAxisPos1().x - 1) })} className={`Game-puyo ${this.kindToClassName(this.state.activePair1.axis)} ${this.state.actionHistories1[this.state.frame] != null || !this.state.isControlledPlayer1 ? "hidden" : ""}`}></div>
        </div>
        <div className={"Game-field Game-pos-field2" + (this.state.isControlledPlayer2 ? " Game-field-active" : "")}>
          {this.fieldToElements(this.state.field2)}
          <div style={({ top: 32 * (10 - this.getSubPos2().y), left: 32 * (this.getSubPos2().x - 1) })} className={`Game-puyo ${this.kindToClassName(this.state.activePair2.sub)} ${this.state.actionHistories2[this.state.frame] != null || !this.state.isControlledPlayer2 ? "hidden" : ""}`}></div>
          <div style={({ top: 32 * (10 - this.getAxisPos2().y), left: 32 * (this.getAxisPos2().x - 1) })} className={`Game-puyo ${this.kindToClassName(this.state.activePair2.axis)} ${this.state.actionHistories2[this.state.frame] != null || !this.state.isControlledPlayer2 ? "hidden" : ""}`}></div>
        </div>
        <div className="Game-next Game-pos-next11">
          {this.nextToElements(this.state.next11)}
        </div>
        <div className="Game-next Game-pos-next12">
          {this.nextToElements(this.state.next12)}
        </div>
        <div className="Game-next Game-pos-next21">
          {this.nextToElements(this.state.next21)}
        </div>
        <div className="Game-next Game-pos-next22">
          {this.nextToElements(this.state.next22)}
        </div>
        <div className="Game-pos-chain1">
          {this.state.chain1} CHAIN
        </div>
        <div className="Game-pos-chain2">
          {this.state.chain2} CHAIN
        </div>
        <div className="Game-pos-score1">
          {this.state.score1} 点
        </div>
        <div className="Game-pos-score2">
          {this.state.score2} 点
        </div>
        <div className="Game-pos-usedScore1">
          {this.state.usedScore1} 点
        </div>
        <div className="Game-pos-usedScore2">
          {this.state.usedScore2} 点
        </div>
        <div className="Game-pos-activeOjama1">
          アクティブおじゃま {this.state.activeOjama1} 個
        </div>
        <div className="Game-pos-activeOjama2">
          アクティブおじゃま {this.state.activeOjama2} 個
        </div>
        <div className="Game-pos-nonActiveOjama1">
          非アクティブおじゃま {this.state.nonActiveOjama1} 個
        </div>
        <div className="Game-pos-nonActiveOjama2">
          非アクティブおじゃま {this.state.nonActiveOjama2} 個
        </div>
        <div className="Game-pos-frame">
          frame: {this.state.frame}
        </div>
        <div className="Game-pos-gameStatusText">
          statusText: {this.state.gameStatusText}
        </div>
        {/* <div>
          <input type="button" value="GameStart" onClick={e => this.gameStart()} />
          <input type="button" value="StepNextFrame" onClick={e => this.stepNextFrame()} />
        </div>
        <input type="button" value="[1P] ON/OFF" onClick={e => this.toggleControlledPlayer1()} />
        <input type="button" value="[2P] ON/OFF" onClick={e => this.toggleControlledPlayer2()} /> */}
      </div>
    );
  }

  actionHistoriesToElements(actionHistories) {
    let array = [];
    for (let index = this.state.frame; index >= 1; index--) {
      let history = actionHistories[index];
      let text = "";
      if (history != null) {
        switch (history.action.type) {
          case Puyotan.ActionType.PASS:
            text = `PASS`
            break;
          case Puyotan.ActionType.PUT:
            text = `PUT(${history.action.x}, ${history.action.dir})`;
            break;
          case Puyotan.ActionType.CHAIN:
            text = `CHAIN`;
            break;
          case Puyotan.ActionType.CHAIN_FALL:
            text = `CHAIN_FALL`;
            break;
          case Puyotan.ActionType.OJAMA:
            text = `OJAMA`;
            break;
          default:
            text = `unknown type`;
            break;
        }
        text = `${text} ${history.remainingFrame}`;
      }
      const style = {
        top: 32 * (this.state.frame - index)
      }
      array.push(<div key={index} style={style} className={`Game-history-tile`}>{index}:{text}</div>);
    }
    return array;
  }

  fieldToElements(field) {
    return field.map((pos, kind) => {
      const style = {
        left: (pos.x - 1) * 32,
        top: (13 - pos.y) * 32,
      }
      const className = this.kindToClassName(kind);
      return <div key={`${pos.x}_${pos.y}`} style={style} className={`Game-puyo ${className}`}></div>;
    });
  }

  nextToElements(pair) {
    return [
      <div key={'sub'} className={`Game-puyo ${this.kindToClassName(pair.sub)}`}></div>,
      <div key={'axs'} className={`Game-puyo ${this.kindToClassName(pair.axis)}`} style={({ top: 32 })}></div>
    ];
  }

  kindToClassName(kind) {
    switch (kind) {
      case Puyo.Kind.RED: return "Game-puyo-kind-red"
      case Puyo.Kind.BLUE: return "Game-puyo-kind-blue"
      case Puyo.Kind.GREEN: return "Game-puyo-kind-green"
      case Puyo.Kind.YELLOW: return "Game-puyo-kind-yellow"
      case Puyo.Kind.OJAMA: return "Game-puyo-kind-ojama"
      default: return "Game-puyo-kind-blank"
    }
  }

  toggleControlledPlayer1() {
    this.setState({ isControlledPlayer1: !this.state.isControlledPlayer1 })
  }

  toggleControlledPlayer2() {
    this.setState({ isControlledPlayer2: !this.state.isControlledPlayer2 })
  }

  reflectPuyotanView(vm) {
    this.setState(this.puyotanViewModelToStateObject(vm));
  }

  gameStart() {
    this.puyotan.start();
    let vm = this.puyotan.getViewModel();
    this.reflectPuyotanView(vm);
    this.setState({
      controledPos1: 3,
      controledDir1: 0,
      controledPos2: 3,
      controledDir2: 0,
    })
  }

  setAction(id, action, frame, isMyself) {
    console.log('setAction', id, action, frame, isMyself)
    if (this.puyotan.getViewModel().frame === frame && this.puyotan.setAction(id, action)) {
      if (id === 0) {
        this.setState({
          controledPos1: 3,
          controledDir1: 0,
        });
      } else {
        this.setState({
          controledPos2: 3,
          controledDir2: 0,
        });
      }
      if (isMyself) {
        db.collection(`puyotan/histories/${id}`).doc(String(this.state.frame)).set({
          type: action.type,
          x: action.x,
          dir: action.dir,
        }).then(function () {
          console.log("Document successfully written!");
        }).catch(function (error) {
          throw Error(error);
        });
      }
      this.stepNextFrame();
    }
  }

  moveLeft() {
    if (this.state.isControlledPlayer1) if (this.state.controledPos1 > 2 || (this.state.controledPos1 === 2 && this.state.controledDir1 !== 3)) this.setState({ controledPos1: this.state.controledPos1 - 1 });
    if (this.state.isControlledPlayer2) if (this.state.controledPos2 > 2 || (this.state.controledPos2 === 2 && this.state.controledDir2 !== 3)) this.setState({ controledPos2: this.state.controledPos2 - 1 });
  }

  moveRight() {
    if (this.state.isControlledPlayer1) if (this.state.controledPos1 < 5 || (this.state.controledPos1 === 5 && this.state.controledDir1 !== 1)) this.setState({ controledPos1: this.state.controledPos1 + 1 });
    if (this.state.isControlledPlayer2) if (this.state.controledPos2 < 5 || (this.state.controledPos2 === 5 && this.state.controledDir2 !== 1)) this.setState({ controledPos2: this.state.controledPos2 + 1 });
  }

  turnLeft() {
    if (this.state.isControlledPlayer1) {
      let adjust = 0;
      if (this.state.controledPos1 === 1 && this.state.controledDir1 === 0) adjust = 1;
      if (this.state.controledPos1 === 6 && this.state.controledDir1 === 2) adjust = -1;
      this.setState({ controledDir1: (this.state.controledDir1 + 3) % 4, controledPos1: this.state.controledPos1 + adjust });
    }
    if (this.state.isControlledPlayer2) {
      let adjust = 0;
      if (this.state.controledPos2 === 1 && this.state.controledDir2 === 0) adjust = 1;
      if (this.state.controledPos2 === 6 && this.state.controledDir2 === 2) adjust = -1;
      this.setState({ controledDir2: (this.state.controledDir2 + 3) % 4, controledPos2: this.state.controledPos2 + adjust });
    }
  }

  turnRight() {
    if (this.state.isControlledPlayer1) {
      let adjust = 0;
      if (this.state.controledPos1 === 1 && this.state.controledDir1 === 2) adjust = 1;
      if (this.state.controledPos1 === 6 && this.state.controledDir1 === 0) adjust = -1;
      this.setState({ controledDir1: (this.state.controledDir1 + 1) % 4, controledPos1: this.state.controledPos1 + adjust });
    }
    if (this.state.isControlledPlayer2) {
      let adjust = 0;
      if (this.state.controledPos2 === 1 && this.state.controledDir2 === 2) adjust = 1;
      if (this.state.controledPos2 === 6 && this.state.controledDir2 === 0) adjust = -1;
      this.setState({ controledDir2: (this.state.controledDir2 + 1) % 4, controledPos2: this.state.controledPos2 + adjust });
    }
  }

  putPuyo() {
    if (this.state.isControlledPlayer1) {
      this.setAction(0, new Puyotan.Action(Puyotan.ActionType.PUT, this.state.controledPos1, this.state.controledDir1), this.state.frame, true)
    }
    if (this.state.isControlledPlayer2) {
      this.setAction(1, new Puyotan.Action(Puyotan.ActionType.PUT, this.state.controledPos2, this.state.controledDir2), this.state.frame, true)
    }
  }

  pass() {
    if (this.state.isControlledPlayer1) {
      this.setAction(0, new Puyotan.Action(Puyotan.ActionType.PASS), this.state.frame, true);
    }
    if (this.state.isControlledPlayer2) {
      this.setAction(1, new Puyotan.Action(Puyotan.ActionType.PASS), this.state.frame, true);
    }
  }

  getAxisPos1() {
    return new Puyo.Pos(this.state.controledPos1, 12);
  }

  getAxisPos2() {
    return new Puyo.Pos(this.state.controledPos2, 12);
  }

  getSubPos1() {
    switch (this.state.controledDir1) {
      case 0: return new Puyo.Pos(this.state.controledPos1, 12 + 1);
      case 1: return new Puyo.Pos(this.state.controledPos1 + 1, 12);
      case 2: return new Puyo.Pos(this.state.controledPos1, 12 - 1);
      case 3: return new Puyo.Pos(this.state.controledPos1 - 1, 12);
      default: throw Error(`unsupported dir ${this.state.controledDir1}`);
    }
  }

  getSubPos2() {
    switch (this.state.controledDir2) {
      case 0: return new Puyo.Pos(this.state.controledPos2, 12 + 1);
      case 1: return new Puyo.Pos(this.state.controledPos2 + 1, 12);
      case 2: return new Puyo.Pos(this.state.controledPos2, 12 - 1);
      case 3: return new Puyo.Pos(this.state.controledPos2 - 1, 12);
      default: throw Error(`unsupported dir ${this.state.controledDir2}`);
    }
  }

  stepNextFrame() {
    this.puyotan.stepNextFrame();
    let vm = this.puyotan.getViewModel();
    this.reflectPuyotanView(vm);
    if (vm.players[0].actionHistories[vm.frame] != null && vm.players[1].actionHistories[vm.frame] != null) {
      this.isControllable = false;
      setTimeout(() => { this.stepNextFrame() }, 500);
    } else {
      this.isControllable = true;
    }
  }

  puyotanViewModelToStateObject(vm) {
    return {
      activePair1: vm.players[0].activePair,
      activePair2: vm.players[1].activePair,
      field1: vm.players[0].field,
      field2: vm.players[1].field,
      next11: vm.players[0].next1,
      next12: vm.players[0].next2,
      next21: vm.players[1].next1,
      next22: vm.players[1].next2,
      frame: vm.frame,
      actionHistories1: vm.players[0].actionHistories,
      actionHistories2: vm.players[1].actionHistories,
      chain1: vm.players[0].chain,
      chain2: vm.players[1].chain,
      score1: vm.players[0].score,
      score2: vm.players[1].score,
      usedScore1: vm.players[0].usedScore,
      usedScore2: vm.players[1].usedScore,
      nonActiveOjama1: vm.players[0].nonActiveOjama,
      nonActiveOjama2: vm.players[1].nonActiveOjama,
      activeOjama1: vm.players[0].activeOjama,
      activeOjama2: vm.players[1].activeOjama,
      gameStatusText: vm.gameStatusText,
    }
  }
}