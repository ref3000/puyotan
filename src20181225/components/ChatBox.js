import React from "react";

export default class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      text: ""
    };
  }

  render() {
    return (
      <div className="ChatBox">
        <input placeholder="名前" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
        <textarea placeholder="コメント" value={this.state.text} onChange={(e) => this.setState({ text: e.target.value })} />
        <button onClick={this.props.submitChat({
          name: this.state.name,
          text: this.state.text
        })}>送信</button>
      </div>
    );
  }

  submit = (e) => {
    this.onButtonClick({
      name: this.state.name,
      text: this.state.text
    });
    this.setState({
      text: ""
    });
  }
}