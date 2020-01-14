const DbConnection = require('../models/DbConnection')
const fs = require('fs')
cwd = process.cwd()

class TestHelper {
  constructor() {
    this.createTableUsers = fs.readFileSync(`${cwd}/db/migrations/02_CREATE_TABLE_USERS.sql`).toString()
    this.createTableStocks = fs.readFileSync(`${cwd}/db/migrations/03_CREATE_TABLE_STOCKS.sql`).toString()
    this.createTableFriends = fs.readFileSync(`${cwd}/db/migrations/04_CREATE_TABLE_FRIENDS.sql`).toString()
    this.insertIntoUsers = fs.readFileSync(`${cwd}/db/migrations/05_INSERT_INTO_USERS.sql`).toString()
    this.insertIntoStocks = fs.readFileSync(`${cwd}/db/migrations/06_INSERT_INTO_STOCKS.sql`).toString()
    console.log(this.insertIntoUsers)
  }
}

helper = new TestHelper()