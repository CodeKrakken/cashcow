import React, { Component } from "react";
import Axios from "axios";

class NewsContainer extends React.Component{
  constructor(props) {
    super(props)
    this.state = {articles : []}
  }

  _fetchData(symbol) {
    Axios.get(`api/news/${symbol}`)
    .then(res => {
      let result = res.data
      this.setState({articles : result})
    })
  }

  componentDidMount() {
    this._fetchData(this.props.symbol)
  }

  componentDidUpdate(prevProps) {
    if (this.props.symbol !== prevProps.symbol) {
      this._fetchData(this.props.symbol)
    }
  }

  render() {
    return(
      <div className="article-container">
        {this.state.articles.map((article) => (
          <div className="article">
            <img className="article-image" src={article.image_url}></img>
            <a className="article-title" href={article.url}><p>{article.title}</p></a>
            {/* <p className="article-body">{article.body}</p> */}
          </div>
        ))}
      </div>
    )
  }
}

export default NewsContainer;
