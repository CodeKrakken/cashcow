import React, { Component } from "react";
import Axios from "axios";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isAuthenticated : false
    };
  }

  clearForm = () => {
    this.setState({email : ""})
    this.setState({password : ""})
  }

  handleLogin = event => {
    event.preventDefault()
    const credentials = { email : this.state.email, password : this.state.password }
    Axios.post('/users/authenticate', credentials)
      .then(res => {
        let token = res.data.token
        let user = res.data.user
        let message = res.data.message
        let sessionId = res.data.sessionId
        if (user) {
          this.props.authenticate({
            user : user, 
            sessionId : sessionId, 
            token : token,
            message : message
          })
          this.clearForm()
        }
      })
      .catch(err => this.props.reject(err))
  }

  render() {
    return (
      <div className="outer-container">
      <div className="login-form-container row">
        <div className="">
        <img src="/cashcowlogosmall.jpg"></img>
        <h2>Sign In</h2>
        <form className="flex-column" onSubmit={this.handleLogin}>
          <label>
            Email Address
            <input
              type="email"
              placeholder="Email"
              onChange={(event) =>
                this.setState({ email: event.target.value })
              }
              value={this.state.email}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="Password"
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
              value={this.state.password}
            />
          </label>
          <button className="btn btn-lg btn-secondary text-center login-button" type="submit">Sign in</button>
        </form>
        </div>
      </div>
      </div>
    );
  }
}

export default LoginForm;
