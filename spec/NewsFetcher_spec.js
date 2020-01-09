const NewsFetcher = require('../models/NewsFetcher')
const fs = require("fs")

describe("NewsFetcher", () =>{
  describe(".parseArticle", () => {
    it("returns an object in format of {headline, body, url, image-url} from a single article", () => {
      let rawDummy = fs.readFileSync(`${__dirname}/dummyData/articleDummy.json`);
      let dummyData = JSON.parse(rawDummy)
      expect(NewsFetcher.parseArticle(dummyData)).toEqual({
        title : "Amazon lawsuit blames Trump for loss of Pentagon cloud contract",
        body : "Amazon.com Inc on Monday accused U.S. President Donald Trump of exerting \"improper pressure\" and bias that led the Department of Defense to award a lucrative $10 billion cloud contract to rival Microsoft Corp .",
        url : "https://www.reuters.com/article/us-amazon-jedi-lawsuit-idUSKBN1YD1XI",
        image_url : "https://s4.reutersmedia.net/resources/r/?m=02&d=20191209&t=2&i=1462079101&w=1200&r=LYNXMPEFB81F8",
        timestamp : "2019-12-09T17:19:41Z"
      })
    })
    it("returns an array of two parsed articles in correct format", () => {
      let rawDummy = fs.readFileSync(`${__dirname}/dummyData/articleDummy.json`);
      let dummyData = JSON.parse(rawDummy)
      let articles = [dummyData, dummyData]
      expect(NewsFetcher.parseArticles(articles)).toEqual([
        {
          title : "Amazon lawsuit blames Trump for loss of Pentagon cloud contract",
          body : "Amazon.com Inc on Monday accused U.S. President Donald Trump of exerting \"improper pressure\" and bias that led the Department of Defense to award a lucrative $10 billion cloud contract to rival Microsoft Corp .",
          url : "https://www.reuters.com/article/us-amazon-jedi-lawsuit-idUSKBN1YD1XI",
          image_url : "https://s4.reutersmedia.net/resources/r/?m=02&d=20191209&t=2&i=1462079101&w=1200&r=LYNXMPEFB81F8",
          timestamp : "2019-12-09T17:19:41Z"
        }, {
          title : "Amazon lawsuit blames Trump for loss of Pentagon cloud contract",
          body : "Amazon.com Inc on Monday accused U.S. President Donald Trump of exerting \"improper pressure\" and bias that led the Department of Defense to award a lucrative $10 billion cloud contract to rival Microsoft Corp .",
          url : "https://www.reuters.com/article/us-amazon-jedi-lawsuit-idUSKBN1YD1XI",
          image_url : "https://s4.reutersmedia.net/resources/r/?m=02&d=20191209&t=2&i=1462079101&w=1200&r=LYNXMPEFB81F8",
          timestamp : "2019-12-09T17:19:41Z"
        }
      ])

    })
  })
})
