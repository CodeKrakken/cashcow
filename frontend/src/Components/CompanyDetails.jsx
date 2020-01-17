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
    this.props.setWebsite(data.data.website);
  }

  render(){
    return(
      <div className="company-details">
        <div className="company-info">
          <h1 className='company-header'><a href={this.state.website}>{this.state.companyName}</a></h1>
          <p>Exchange: {this.state.exchange}</p>
          <p>Industry: {this.state.industry}</p>
        </div>
        <div className="company-description">
          <p>{this.state.description}</p>
        </div>
      </div>
    )
  }
}

export default CompanyDetails
