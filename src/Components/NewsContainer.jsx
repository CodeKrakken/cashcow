import React, { Component } from "react";
import Axios from "axios";

class NewsContainer extends React.Component{
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    Axios.get(`/news/${this.props.symbol}`)
    .then(res => {
      console.log(res)
      // this.setState({articles : res})
      // console.log(this.state.articles)
    })
  }

  render() {
    return(<h1>Hello</h1>)
  }


}

export default NewsContainer;
