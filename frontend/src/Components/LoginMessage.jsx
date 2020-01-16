import React, { Component } from "react";

class LoginMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    if (this.props.isRejected && !this.props.didLogin) {
      return(
        <h1>Sign Up/ Login Failed</h1>
      )
    } else if (this.props.didLogin && !this.props.isRejected) {
      return(
        <h1>{this.props.message}</h1>
      )
    } else {
      return null;
    }
  }
}

export default LoginMessage;
