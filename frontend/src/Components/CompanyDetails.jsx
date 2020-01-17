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
  }

  render(){
    return(
      <div className="company-details">
        <div className="company-info">
          <h1 className='company-header flex-item'><a href={this.state.website}>{this.state.companyName}</a></h1>
          <img className="company-logo flex-item" src={`//logo.clearbit.com/${this.state.website}`}></img>
          <p className="flex-item">Exchange: {this.state.exchange}</p>
          <p className="flex-item">Industry: {this.state.industry}</p>
        </div>
        <div id="company-description">
          <h4>About The Company</h4>
          <p><span className="indent"></span>{this.state.description}</p>
        </div>
      </div>
    )
  }
}

export default CompanyDetails
