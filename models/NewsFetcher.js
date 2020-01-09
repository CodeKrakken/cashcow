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
}

module.exports = NewsFetcher