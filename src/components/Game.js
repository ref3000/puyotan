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
    this.state = {
      activePair1: new Puyo.PuyoPair(),
      activePair2: new Puyo.PuyoPair(),
      field1: new Puyo.Field(),
      field2: new Puyo.Field(),
      next11: new Puyo.PuyoPair(),
      next12: new Puyo.PuyoPair(),
      next21: new Puyo.PuyoPair(),
      next22: new Puyo.PuyoPair(),
      frame: 0,
      actionHistories1: [],
      actionHistories2: [],
      chain1: 0,
      chain2: 0,
      score1: 0,
      score2: 0,
      usedScore1: 0,
      usedScore2: 0,
      nonActiveOjama1: 0,
      nonActiveOjama2: 0,
      activeOjama1: 0,
      activeOjama2: 0,
      gameStatusText: '初期化待ち',

      controledPos1: 0,
      controledDir1: 0,
      controledPos2: 0,
      controledDir2: 0,
      isControlledPlayer1: false,
      isControlledPlayer2: false,

      seed: 0,
      displayedSeed: 0,
    };
    // Object.assign(this.state, this.puyotanViewModelToStateObject(vm));
    this.isControllable = true;

    // keyboard 操作用
    window.addEventListener('keydown', e => {
      // e.preventDefault();
      if (!this.isControllable) return;
      switch (e.keyCode) {
        case 37: // ←キー
          e.preventDefault();
          this.moveLeft();
          return
        case 39: // →キー
          e.preventDefault();
          this.moveRight();
          return
        case 38: // ↑キー
          e.preventDefault();
          return
        case 40: // ↓キー
          e.preventDefault();
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
          this.sendInit(Number(this.state.seed) + 1);
          return
        case 83: // s
          // this.sendInit();
          return
        case 84: // t
          return
        default:
          return;
      }
    })

    // firestore 監視用
    this.dbActions0 = [];
    this.dbActions1 = [];
    let cancel0;
    let cancel1;
    db.collection("puyotan").doc("info").onSnapshot((docSnapshot) => {
      let info = docSnapshot.data();
      if (info == null) return;
      this.dbActions0 = [];
      this.dbActions1 = [];
      this.initPuyotan(info.seed);
      if (cancel0 != null) cancel0();
      cancel0 = db.collection(`puyotan/actions/${info.seed}/ids/0`).onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
        let actions = [];
        querySnapshot.forEach((doc) => {
          let d = doc.data();
          if (!doc.metadata.hasPendingWrites) {
            actions[doc.id] = {
              type: d.type,
              x: d.x,
              dir: d.dir,
            }
          }
        });
        this.dbActions0 = actions;
        this.applyActions();
      });
      if (cancel1 != null) cancel1();
      cancel1 = db.collection(`puyotan/actions/${info.seed}/ids/1`).onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
        let actions = [];
        querySnapshot.forEach((doc) => {
          let d = doc.data();
          if (!doc.metadata.hasPendingWrites) {
            actions[doc.id] = {
              type: d.type,
              x: d.x,
              dir: d.dir,
            }
          }
        });
        this.dbActions1 = actions;
        this.applyActions();
      });
    });
  }

  render() {
    let prevHistory1 = this.state.actionHistories1[this.state.frame - 1];
    let prevAction1 = (prevHistory1 == null ? new Puyotan.Action() : prevHistory1.action)
    if (prevHistory1 != null && prevHistory1.remainingFrame !== 1 && prevAction1.type === Puyotan.ActionType.PUT) prevAction1 = new Puyotan.Action(Puyotan.ActionType.PUT, 3, 0);
    let prevHistory2 = this.state.actionHistories2[this.state.frame - 1];
    let prevAction2 = (prevHistory2 == null ? new Puyotan.Action() : prevHistory2.action)
    if (prevHistory2 != null && prevHistory2.remainingFrame !== 1 && prevAction2.type === Puyotan.ActionType.PUT) prevAction2 = new Puyotan.Action(Puyotan.ActionType.PUT, 3, 0);

    let currentHistory1 = this.state.actionHistories1[this.state.frame];
    let currentHistory2 = this.state.actionHistories2[this.state.frame];

    let floatingDir1 = this.state.controledDir1;
    let floatingDir2 = this.state.controledDir2;
    let floatingAxisPos1 = new Puyo.Pos(this.state.controledPos1, 12);
    let floatingAxisPos2 = new Puyo.Pos(this.state.controledPos2, 12);

    let visibleFloatingPuyo1 = this.state.isControlledPlayer1 && currentHistory1 == null;
    let visibleFloatingPuyo2 = this.state.isControlledPlayer2 && currentHistory2 == null;

    if (currentHistory1 != null && currentHistory1.action.type === Puyotan.ActionType.PUT && currentHistory1.remainingFrame === 0) {
      floatingDir1 = currentHistory1.action.dir;
      floatingAxisPos1 = new Puyo.Pos(currentHistory1.action.x, 12);
      visibleFloatingPuyo1 = true;
    } else if (currentHistory1 != null && currentHistory1.action.type === Puyotan.ActionType.PUT && currentHistory1.remainingFrame === 1) {
      if (this.state.isControlledPlayer1) {
        floatingDir1 = currentHistory1.action.dir;
        floatingAxisPos1 = new Puyo.Pos(currentHistory1.action.x, 12);
      } else {
        floatingDir1 = 0;
        floatingAxisPos1 = new Puyo.Pos(3, 12);
      }
      visibleFloatingPuyo1 = true;
    } else if (currentHistory1 != null && currentHistory1.action.type === Puyotan.ActionType.PASS) {
      floatingDir1 = 0;
      floatingAxisPos1 = new Puyo.Pos(3, 12);
      visibleFloatingPuyo1 = true;
    } else if (currentHistory1 == null && !this.state.isControlledPlayer1) {
      floatingDir1 = 0;
      floatingAxisPos1 = new Puyo.Pos(3, 12);
      visibleFloatingPuyo1 = true;
    }

    if (currentHistory2 != null && currentHistory2.action.type === Puyotan.ActionType.PUT && currentHistory2.remainingFrame === 0) {
      floatingDir2 = currentHistory2.action.dir;
      floatingAxisPos2 = new Puyo.Pos(currentHistory2.action.x, 12);
      visibleFloatingPuyo2 = true;
    } else if (currentHistory2 != null && currentHistory2.action.type === Puyotan.ActionType.PUT && currentHistory2.remainingFrame === 1) {
      if (this.state.isControlledPlayer2) {
        floatingDir2 = currentHistory2.action.dir;
        floatingAxisPos2 = new Puyo.Pos(currentHistory2.action.x, 12);
      } else {
        floatingDir2 = 0;
        floatingAxisPos2 = new Puyo.Pos(3, 12);
      }
      visibleFloatingPuyo2 = true;
    } else if (currentHistory2 != null && currentHistory2.action.type === Puyotan.ActionType.PASS) {
      floatingDir2 = 0;
      floatingAxisPos2 = new Puyo.Pos(3, 12);
      visibleFloatingPuyo2 = true;
    } else if (currentHistory2 == null && !this.state.isControlledPlayer2) {
      floatingDir2 = 0;
      floatingAxisPos2 = new Puyo.Pos(3, 12);
      visibleFloatingPuyo2 = true;
    }

    let floatingSubPos1 = this.getSubPos(floatingAxisPos1, floatingDir1);
    let floatingSubPos2 = this.getSubPos(floatingAxisPos2, floatingDir2);

    return (
      <div className="Game" >
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
        <div className={`Game-history Game-pos-history1`}>
          {this.actionHistoriesToElements(this.state.actionHistories1)}
        </div>
        <div className={`Game-history Game-pos-history2`}>
          {this.actionHistoriesToElements(this.state.actionHistories2)}
        </div>
        <div className={"Game-field Game-pos-field1" + (this.state.isControlledPlayer1 ? " Game-field-active" : "")}>
          {this.fieldToElements(this.state.field1)}
          <div style={({ top: 32 * (10 - floatingSubPos1.y), left: 32 * (floatingSubPos1.x - 1) })} className={`Game-puyo ${this.kindToClassName(this.state.activePair1.sub)} ${visibleFloatingPuyo1 ? "" : "hidden"}`}></div>
          <div style={({ top: 32 * (10 - floatingAxisPos1.y), left: 32 * (floatingAxisPos1.x - 1) })} className={`Game-puyo ${this.kindToClassName(this.state.activePair1.axis)} ${visibleFloatingPuyo1 ? "" : "hidden"}`}></div>
          {/* <div style={({ top: 32 * (-1 + this.getSubDiffY(prevAction1.dir)), left: 32 * (prevAction1.x - 1 + this.getSubDiffX(prevAction1.dir)) })} className={`Game-puyo ${this.kindToClassName(this.state.activePair1.sub)} ${(prevAction1.type === Puyotan.ActionType.PUT) && prevHistory1.remainingFrame === 1 ? "" : "hidden"}`}></div> */}
          {/* <div style={({ top: 32 * -1, left: 32 * (prevAction1.x - 1) })} className={`Game-puyo ${this.kindToClassName(this.state.activePair1.axis)} ${(prevAction1.type === Puyotan.ActionType.PUT) && prevHistory1.remainingFrame === 1 ? "" : "hidden"}`}></div> */}
        </div>
        <div className={"Game-field Game-pos-field2" + (this.state.isControlledPlayer2 ? " Game-field-active" : "")}>
          {this.fieldToElements(this.state.field2)}
          <div style={({ top: 32 * (10 - floatingSubPos2.y), left: 32 * (floatingSubPos2.x - 1) })} className={`Game-puyo ${this.kindToClassName(this.state.activePair2.sub)} ${visibleFloatingPuyo2 ? "" : "hidden"}`}></div>
          <div style={({ top: 32 * (10 - floatingAxisPos2.y), left: 32 * (floatingAxisPos2.x - 1) })} className={`Game-puyo ${this.kindToClassName(this.state.activePair2.axis)} ${visibleFloatingPuyo2 ? "" : "hidden"}`}></div>
          {/* <div style={({ top: 32 * (-1 + this.getSubDiffY(prevAction2.dir)), left: 32 * (prevAction2.x - 1 + this.getSubDiffX(prevAction2.dir)) })} className={`Game-puyo ${this.kindToClassName(this.state.activePair2.sub)} ${(prevAction2.type === Puyotan.ActionType.PUT) && prevHistory2.remainingFrame === 1 ? "" : "hidden"}`}></div> */}
          {/* <div style={({ top: 32 * -1, left: 32 * (prevAction2.x - 1) })} className={`Game-puyo ${this.kindToClassName(this.state.activePair2.axis)} ${(prevAction2.type === Puyotan.ActionType.PUT) && prevHistory2.remainingFrame === 1 ? "" : "hidden"}`}></div> */}
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
        <input type="button" value={this.state.isControlledPlayer1 ? `[1P] 離席` : `[1P] 着席`} onClick={e => this.toggleControlledPlayer1()} className={`Game-button Game-size-onoff Game-pos-onoff1`} />
        <input type="button" value={this.state.isControlledPlayer2 ? `[2P] 離席` : `[2P] 着席`} onClick={e => this.toggleControlledPlayer2()} className={`Game-button Game-size-onoff Game-pos-onoff2`} />
        <input type="button" value="⇦" onClick={e => this.moveLeft()} className={`Game-button Game-size-button Game-pos-leftmove`} />
        <input type="button" value="⇨" onClick={e => this.moveRight()} className={`Game-button Game-size-button Game-pos-rightmove`} />
        <input type="button" value="L" onClick={e => this.turnLeft()} className={`Game-button Game-size-button Game-pos-leftturn`} />
        <input type="button" value="R" onClick={e => this.turnRight()} className={`Game-button Game-size-button Game-pos-rightturn`} />
        <input type="button" value="⇩" onClick={e => this.putPuyo()} className={`Game-button Game-size-button2 Game-pos-put`} />
        <input type="button" value="Reset" onClick={e => this.sendInit(Number(this.state.seed) + 1)} className={`Game-button Game-size-reset Game-pos-reset`} />
        <input type="number" value={this.state.displayedSeed} onChange={e => this.setState({ displayedSeed: e.target.value })} className={`Game-input-seed`} />
        <input type="button" value="GO" onClick={e => this.sendInit(this.state.displayedSeed)} className={`Game-button Game-size-go Game-pos-go`} />
      </div>
    );
  }

  getSubPos(axisPos, dir) {
    switch (dir) {
      case 0: return new Puyo.Pos(axisPos.x, axisPos.y + 1);
      case 1: return new Puyo.Pos(axisPos.x + 1, axisPos.y);
      case 2: return new Puyo.Pos(axisPos.x, axisPos.y - 1);
      case 3: return new Puyo.Pos(axisPos.x - 1, axisPos.y);
      default: throw Error(`unsupported dir ${this.state.controledDir1}`);
    }
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
      this.sendAction(0, this.state.frame, new Puyotan.Action(Puyotan.ActionType.PUT, this.state.controledPos1, this.state.controledDir1))
    }
    if (this.state.isControlledPlayer2) {
      this.sendAction(1, this.state.frame, new Puyotan.Action(Puyotan.ActionType.PUT, this.state.controledPos2, this.state.controledDir2))
    }
  }

  pass() {
    if (this.state.isControlledPlayer1) {
      this.sendAction(0, this.state.frame, new Puyotan.Action(Puyotan.ActionType.PASS));
    }
    if (this.state.isControlledPlayer2) {
      this.sendAction(1, this.state.frame, new Puyotan.Action(Puyotan.ActionType.PASS));
    }
  }

  stepNextFrame() {
    if (!this.puyotan.canStepNextFrame()) return;
    this.puyotan.stepNextFrame();
    let vm = this.puyotan.getViewModel();
    this.reflectPuyotanView(vm);
    if (vm.players[0].actionHistories[vm.frame] != null && vm.players[1].actionHistories[vm.frame] != null) {
      this.isControllable = false;
      setTimeout(() => { this.stepNextFrame() }, 500);
    } else {
      this.isControllable = true;
      this.applyActions(500);
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

  sendAction(id, frame, action) {
    db.collection(`puyotan/actions/${this.state.seed}/ids/${id}`).doc(String(frame)).set({
      type: action.type,
      x: action.x,
      dir: action.dir,
    }).then(function () {
      console.log("Document successfully written!");
    }).catch(function (error) {
      console.error(error);
    });
  }

  setAction(id, frame, action) {
    console.log('setAction(id, frame, action)', id, frame, action);
    if (this.puyotan.frame !== frame) return;
    if (this.puyotan.setAction(id, action)) {
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
      this.stepNextFrame();
    }
  }

  applyActions(waitMs = 0) {
    let frame = this.state.frame;
    let action0 = this.dbActions0[frame];
    let action1 = this.dbActions1[frame];
    console.log(`applyActions(frame, action0, action1)`, frame, action0, action1)
    if (action0 != null || action1 != null) {
      if (waitMs <= 0) {
        if (action0 != null) this.setAction(0, frame, action0);
        if (action1 != null) this.setAction(1, frame, action1);
      } else {
        this.isControllable = false;
        setTimeout(() => {
          if (action0 != null) this.setAction(0, frame, action0);
          if (action1 != null) this.setAction(1, frame, action1);
          this.isControllable = true;
        }, waitMs);
      }
    }
  }

  sendInit(seed) {
    if (seed == null) seed = Math.floor(Math.random() * Math.floor(9999));
    db.collection(`puyotan`).doc('info').set({
      seed: seed
    }).then(function () {
      console.log("Document successfully written!");
    }).catch(function (error) {
      console.error(error);
    });
  }

  initPuyotan(seed) {
    console.log('initPuyotan', seed);
    this.puyotan = new Puyotan.Puyotan(seed);
    this.puyotan.start();
    let vm = this.puyotan.getViewModel();
    this.reflectPuyotanView(vm);
    this.setState({
      seed: seed,
      displayedSeed: seed,
      controledPos1: 3,
      controledDir1: 0,
      controledPos2: 3,
      controledDir2: 0,
    })
  }
}