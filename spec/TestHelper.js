const DbConnection = require('../models/DbConnection')
const fs = require('fs')
cwd = process.cwd()

class TestHelper {
  constructor() {
    this.createTableUsersQuery = fs.readFileSync(`${cwd}/db/migrations/02_CREATE_TABLE_USERS.sql`).toString()
    this.createTableStocksQuery = fs.readFileSync(`${cwd}/db/migrations/03_CREATE_TABLE_STOCKS.sql`).toString()
    this.createTableFriendsQuery = fs.readFileSync(`${cwd}/db/migrations/04_CREATE_TABLE_FRIENDS.sql`).toString()
    this.insertIntoUsersQuery = fs.readFileSync(`${cwd}/db/migrations/05_INSERT_INTO_USERS.sql`).toString()
    this.insertIntoStocksQuery = fs.readFileSync(`${cwd}/db/migrations/06_INSERT_INTO_STOCKS.sql`).toString()
  }

  async createTableUsers() {
    try {
      let db = new DbConnection()
      await db.start()
      let result = await db.query(this.createTableUsers)
      await db.close()
      return result
    } catch (err) {
      console.error(err)
    }
  }
}

helper = new TestHelper()