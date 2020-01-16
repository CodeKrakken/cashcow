import React, { Component } from "react";
import { Redirect } from "react-router-dom";

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
        <Redirect to='/portfolio' />
      )
    } else {
      return null;
    }
  }
}

export default LoginMessage;
