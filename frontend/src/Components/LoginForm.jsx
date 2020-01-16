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

  componentDidMount() {
  }

  clearForm = () => {
    this.setState({email : ""})
    this.setState({password : ""})
  }

  handleLogin = event => {
    event.preventDefault()
    let credentials = { email : this.state.email, password : this.state.password }
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
      <div className="loginForm">
        <form className="" onSubmit={this.handleLogin}>
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

        {/* <form class="form-signin">
          <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"> Remember me
            </label>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          <p class="mt-5 mb-3 text-muted">© 2017-2018</p>
        </form> */}
      </div>
    );
  }
}

export default LoginForm;
