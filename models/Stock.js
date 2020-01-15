const dbConnection = require("./DbConnection");

class Stock {
  constructor(symbol, userId) {
    this.symbol = symbol
    this.userId = userId
  }

  static async create(symbol, userId) {

  }

  static async findByUserId(userId) {
    let db = new dbConnection();
    let result = await db.query(`SELECT symbol, amount FROM stocks WHERE user_id=${userId}`)
    return result.rows
  }

  static async delete() {

  }

  static async update() {

  }
}

module.exports = Stock;