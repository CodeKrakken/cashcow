const User = require('../models/User')
const TestHelper = require('./TestHelper')
process.env.NODE_ENV = 'TEST'

describe('User', () => {
  beforeAll(async () => {
    let helper = new TestHelper()
    await helper.setupTestDb()
  })

  afterAll(async () => {
    let helper = new TestHelper()
    await helper.tearDownTestDb()
  })

  describe('.find', () => {
    it('retrieves a user from the database', async () => {
      let result = await User.find(1)
      expect(result[0].first).toEqual('Robert')
    })

    it('returns [] if a user doesnt exist', async () => {
      expect(await User.find(0)).toEqual([])
    })
  })

  describe('.findByEmail', () => {
    it('returns a users details if the user exists in the db', async () => {
      let result = await User.findByEmail("robert@test.com")
      expect(result.email).toEqual("robert@test.com")
    })

    it('returns undefined if the user does not exist in the db', async () => {
      let result = await User.findByEmail("doesntexist@gmail.com")
      expect(result).toEqual(undefined)
    })
  })

  describe('.check_exists', () => {
    it('returns true if a user exists in the db', async () => {
      expect(await User.check_exists("robert@test.com")).toBe(true)
    })

    it('returns false if a user doesnt exist in the db', async () => {
      expect(await User.check_exists("blahblah@gmail.com")).toBe(false)
    })
  })

  describe('.create', () => {
    it('creates a new user', async () => {
      let user = await User.create('TGriffith','Thomas', 'Griffith', 'tomtom@gmail.com', 'secret')
      expect(user instanceof User).toBe(true)
    })

    it('adds a user to the database', async () => { // doesnt test if user has beem added to DB!!
      let user = await User.create('RobertR', 'Robert', 'Rosiji', 'bibbyCodes@test.com', 'secret')
      expect(user.first).toEqual('Robert')
      expect(user.last).toEqual('Rosiji')
    })

    it('returns "user already exists" if the user already exists', async () => {
      expect(await User.create('bibbyCodes', 'Robert', 'Rosiji', 'robert@test.com', 'password'))
      .toEqual("user already exists")
    })
  })

  describe('.authenticate', () => {
    it('returns the user after successful authentication', async () => {
      let user = await User.create('Joe_G','Joe', 'Griffith', 'joe@gmail.com', 'testpass')
      let results = await User.authenticate('joe@gmail.com', 'tespass')
      expect(await User.authenticate('joe@gmail.com', 'testpass')).toEqual(user)
    })

    it('returns "Email or Password Incorrect" if the password is incorrect', async () => {
      let user = await User.create('Joey_G','Joe', 'Griffith', 'joeyG@gmail.com', 'testpass')
      let message = await User.authenticate('joeyG@gmail.com', 'wrongpass')
      expect(message).toEqual("Email or Password Incorrect")
    })
  })
})