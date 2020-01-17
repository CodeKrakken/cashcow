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
    const formatDate = (UTCString) => {
      const date = new Date(UTCString);
      return date.toLocaleDateString(); // alternative format: toDateString() 
    }

    return(
      <div className="article-container">
        {this.state.articles.map((article, index) => {
            if(!article.image_url) {
              article.image_url = "https://hazelwood-dental.com/wp-content/themes/hazelwood/images/no-image-found-360x250.png"
            }
            return(
              <div key={index}className="article">
                <img key={index/2}className="article-image" src={article.image_url}></img>
                <p key={index/3}className="article-date">{formatDate(article.timestamp)}</p>
                <a key={index/4}className="article-title" href={article.url}><p>{article.title}</p></a>
              </div>
            )
        })}
      </div>
    )
  }
}

export default NewsContainer;
