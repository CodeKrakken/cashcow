import React, { Component } from "react";
import Axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null
    };
  }

  clearForm = () => {
    this.setState({
      username: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null
    })
  }

  handleSignup = event => {
    event.preventDefault();
    let credentials = {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };

    Axios.post("/users/register", credentials)
      .then(res => {
        if (res.status == 200) {
          console.log("register", res)
          this.props.authenticate(res.data)
          this.clearForm()
        }
      })
      .catch(err => this.props.reject(err));
  };

  render() {
    return (
      <div className="register-form-container-outer">
      <div className="register-form-container">
      <img className = "image-logo-container" src="/cashcowlogosmall.jpg"></img>
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSignup}>
          <label>
            UserName
            <input
              type="text"
              placeholder="UserName"
              onChange={(event) =>
                this.setState({ username: event.target.value })
              }
              value={this.state.username}
            />
          </label>

          <label>
            First Name
            <input
              type="text"
              placeholder="First Name"
              onChange={(event) =>
                this.setState({ firstName: event.target.value })
              }
              value={this.state.firstName}
            />
          </label>

          <label>
            Last Name
            <input
              type="text"
              placeholder="Last Name"
              onChange={(event) =>
                this.setState({ lastName: event.target.value })
              }
              value={this.state.lastName}
            />
          </label>

          <label>
            Email Address
            <input
              type="email"
              placeholder="Email Address"
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

          <button className="btn btn-lg btn-secondary text-center sign-up-button" type="submit">Sign up</button>
        </form>
      </div>
      </div>
    );
  }
}

export default SignUp;
