import React from "react";
import './Game.css';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      text: ""
    };
  }

  render() {
    return (
      <div className="Game">
        <div className="Game-field Game-pos-field1"></div>
        <div className="Game-field Game-pos-field2"></div>
      </div>
    );
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