import React, { Component } from "react";
import Axios from "axios";

class NewsContainer extends React.Component{
  constructor(props) {
    super(props)
    this.state = {articles : []}
  }

  componentDidMount() {
    Axios.get(`/news/${this.props.symbol}`)
    .then(res => {
      let result = res.data
      console.log(res.data)
      this.setState({articles : result})
    })
  }

  render() {
    return(
      <div>
        {this.state.articles.map((article) => (
          <div>
            <a href={article.url}><p>{article.title}</p></a>
            <img src={article.image_url}></img>
          </div>
        ))}
      </div>

    )
    
  }


}

export default NewsContainer;
