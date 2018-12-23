import React, { Component } from 'react';

class Sample extends Component {
  render() {
    return (
      <div className="Sample">
        <h1>さんぷる{this.props.value}</h1>
      </div>
    );
  }
}

export default Sample;
