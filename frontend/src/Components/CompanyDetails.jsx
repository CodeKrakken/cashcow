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

        <h3 className='company-header flex-item'>
          {/*<div className="company-image-container">
            <img className="company-logo flex-item" src={`//logo.clearbit.com/${this.state.website}`}></img>
          </div>*/}
          <div className="company-text-container">
            <p><a href={this.state.website}>{this.state.companyName}</a></p>
            <p>Industry: {this.state.industry}</p>
            <p>Exchange: {this.state.exchange}</p>
          </div>
        </h3>

        </div>
        <div id="company-description">
          <p>{this.state.description}</p>
        </div>
      </div>
    )
  }
}

export default CompanyDetails
