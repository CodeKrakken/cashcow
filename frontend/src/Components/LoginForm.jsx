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
      <div>
        <form onSubmit={this.handleLogin}>
          <label>
            Email
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
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default LoginForm;
