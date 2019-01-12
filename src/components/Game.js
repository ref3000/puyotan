import React from "react";
import './Game.css';
import Puyo from '../lib/Puyo.js';
import Puyotan from '../lib/Puyotan.js';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      next: new Puyo.Next(),
      field1: new Puyo.Field(),
      field2: new Puyo.Field()
    };
    this.puyotan = new Puyotan.Puyotan();

    // console 操作用
    window.Puyotan = Puyotan;
    window.Game = this;
    // this.cnt = 0;
    // setInterval(() => {
    //   const field = this.state.field1.copy();
    //   const ppair = this.state.next.get(this.cnt);
    //   this.cnt++;
    //   field.set(new Puyo.Pos(1, 2), ppair.axis);
    //   field.set(new Puyo.Pos(2, 2), ppair.sub);
    //   field.set(new Puyo.Pos(3, 2), Puyo.Kind.BLUE);
    //   console.log(field)
    //   this.setState({
    //     field1: field
    //   })
    // }, 1000)
  }

  render() {
    console.log(this.state.field1)
    return (
      <div className="Game">
        <div className="Game-field Game-pos-field1">
          {this.fieldToElements(this.state.field1)}
        </div>
        <div className="Game-field Game-pos-field2">
          {this.fieldToElements(this.state.field2)}
        </div>
      </div>
    );
  }

  fieldToElements(field) {
    return field.map((pos, kind) => {
      const style = {
        left: (pos.x - 1) * 32,
        top: (13 - pos.y) * 32,
      }
      const className = this.kindToClassName(kind);
      return <div key={`${pos.x}_${pos.y}`} style={style} className={`Game-puyo ${className}`}></div>;
    })
  }

  kindToClassName(kind) {
    switch(kind) {
      case Puyo.Kind.RED: return "Game-puyo-kind-red"
      case Puyo.Kind.BLUE: return "Game-puyo-kind-blue"
      case Puyo.Kind.GREEN: return "Game-puyo-kind-green"
      case Puyo.Kind.YELLOW: return "Game-puyo-kind-yellow"
      case Puyo.Kind.OJAMA: return "Game-puyo-kind-ojama"
      default: return "Game-puyo-kind-blank"
    }
  }

  setAction(id, action) {
    this.puyotan.setAction(id, action);
  }

  stepNextFrame(id, action) {
    this.puyotan.stepNextFrame();
  }

  // submit = (e) => {
  //   this.onButtonClick({
  //     name: this.state.name,
  //     text: this.state.text
  //   });
  //   this.setState({
  //     text: ""
  //   });
  // }
}