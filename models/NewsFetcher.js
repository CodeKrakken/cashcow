const axios = require('axios')

class NewsFetcher {
  static async fetchArticles(encodedName) {
    try {
      const key = process.env.NEWS_KEY
      const language = 'en'
      const startDate = new Date(Date.now() - 12096e5).toISOString() // 14 days in milliseconds
      const endpoint = `https://newsapi.org/v2/everything?q=${encodedName}&apiKey=${key}&from=${startDate}&language=${language}`
      const response = await axios.get(endpoint)
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
