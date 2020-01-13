import React, { Component } from "react";
import Axios from "axios";

class CompanyDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    this.fetchData(this.props.symbol)
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.symbol !== this.props.symbol) {
      await this.fetchData(this.props.symbol)
    }
  }

  async fetchData(symbol) {
    let data = await Axios.get(`/api/company/${this.props.symbol}`)
    this.setState(data.data)
    console.log(this.state)
  }

  render(){
    return(
      <div class="company-details">
        <h1 className='company-header'><a href={this.state.website}>{this.state.companyName}</a></h1>
        <img src={`//logo.clearbit.com/${this.state.website}`}></img>
        <p>Exchange: {this.state.exchange}</p>
        <p>Industry: {this.state.industry}</p>
        <p>About The Company: </p>
        <p><span className="indent"></span>{this.state.description}</p>
      </div>
    )
  }
}

export default CompanyDetails