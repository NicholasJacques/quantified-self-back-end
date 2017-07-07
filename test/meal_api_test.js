const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const Food = require('../lib/models/food')
const Meal = require('../lib/models/meal')
const pry = require('pryjs')
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const knex = require('knex')(configuration);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


describe("Server", function () {
  this.timeout(100000)

  before(function(done){
    this.port = 9875
    this.server = app.listen(this.port, function(err, result){
      if(err) {return done(err)}
      done()
     })
    this.request = request.defaults({
      baseUrl: 'http://localhost:9876'
    })
  })

  beforeEach(function(done) {
    knex('foods').insert([
      {name: 'banana', calories: 80, active: 't'},
      {name: 'egg', calories: 78, active: 't'},
      {name: 'big mac', calories: 563, active: 't'},
      {name: 'crunchwrap supreme', calories: 535, active: 't'}
    ]).then(function() {
      knex('meals').insert([
        {name: 'Breakfast', goal_calories: 650},
        {name: 'Lunch', goal_calories: 650},
        {name: 'Dinner', goal_calories: 650},
        {name: 'Snacks', goal_calories: 250}
      ]).then(function() {
        knex('food_meals').insert([
          {meal_id: 1, food_id: 1},
          {meal_id: 1, food_id: 2},
          {meal_id: 1, food_id: 3},
          {meal_id: 1, food_id: 1},
          {meal_id: 2, food_id: 2},
          {meal_id: 2, food_id: 4},
          {meal_id: 2, food_id: 2},
          {meal_id: 2, food_id: 3},
          {meal_id: 3, food_id: 1},
          {meal_id: 3, food_id: 1},
          {meal_id: 3, food_id: 2},
          {meal_id: 3, food_id: 3}
        ]).then(function() {
          done()
        })
      })
    })
  })

  afterEach(function(done) {
    knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE').then(function() {
      knex.raw('TRUNCATE meals RESTART IDENTITY CASCADE').then(function() {
        knex.raw('TRUNCATE food_meals RESTART IDENTITY CASCADE').then(function() {
          done()
        })
      })
    })
  })

  describe('GET /api/meals/:name', function () {
    it('returns that meal and all of its associated foods', function (done) {
      this.request.get('api/meals/Lunch', function (error, response) {
        if (error) { done(error) }
        let body = JSON.parse(response.body)

        assert.equal(body.length, 4)
        done()
      })
    })
  })

  describe('POST api/meals/:name', function() {
    it('creates a foodmeal with attached to that meal', function(done) {
      const request = this.request

      Food.find(1).then(function(query) {
        let food = query.rows[0]

        request.post('api/meals/Lunch', {form: {id: 1}}, function(error, response) {
          if (error) { done(error) }

          let parsedResponse = JSON.parse(response.body)

          assert.equal(response.statusCode, 200)
          assert.include(parsedResponse[parsedResponse.length - 1].name, food.name)
          done()
        })
      })
    })
  })

  describe('DELETE api/meals/:name', function() {
    it('removes that food from the meal', function(done) {
      this.request.delete('api/meals/Lunch', {form: {id: 7}}, function(error, response) {
        if (error) { done(error) }
        let parsedResponse = JSON.parse(response.body)

        assert.equal(response.statusCode, 200)
        assert.equal(parsedResponse.length, 3)
        done()
      })
    })
  })
})
