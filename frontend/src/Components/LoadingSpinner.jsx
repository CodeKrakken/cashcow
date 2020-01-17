import React, { Component } from "react";
import Loader from 'react-loader-spinner'

class LoadingSpinner extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount() {
  }

  render () {
    return(
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    );
  }
}

module.exports = LoadingSpinner