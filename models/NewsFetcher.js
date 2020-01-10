const axios = require('axios')

class NewsFetcher {
  static async fetchArticles(symbol) {
    try {
      let key = process.env.NEWS_KEY
      console.log(key)
      let endpoint = `https://newsapi.org/v2/everything?q=${symbol}&apiKey=${key}`
      let response = await axios.get(endpoint)
      return response.data
    } catch(err) {
      console.log(err)
    }
  }

  static parseArticle(data) {
    return {
      title : data.title,
      body : data.description,
      url : data.url,
      image_url : data.urlToImage,
      timestamp : data.publishedAt
    }
  }

  static parseArticles(arrayOfArticles) {
    let articles = []
    for (let i = 0; i < arrayOfArticles.length; i++) {
      articles.push(this.parseArticle(arrayOfArticles[i]))
    }
    return articles;
  }
}

module.exports = NewsFetcher
