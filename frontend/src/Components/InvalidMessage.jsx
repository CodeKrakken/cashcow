import React, { Component } from "react";

class InvalidMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    if (this.props.flag === 1) {
      return(
        <div>
          <p>Sorry, that's not a valid symbol - try MSFT, GOOG or F...</p>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default InvalidMessage;
