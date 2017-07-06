const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const Food = require('../lib/models/food')
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
    // Food.create('egg', 95)
    knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE').then(function () {
      return knex('foods').insert([
        {name: 'banana', calories: 80, active: 't'},
        {name: 'egg', calories: 78, active: 't'},
        {name: 'big mac', calories: 563, active: 't'},
        {name: 'crunchwrap supreme', calories: 535, active: 't'}
      ])
    }).then(function() {
      knex.raw('TRUNCATE meals RESTART IDENTITY CASCADE').then(function () {
        return knex('meals').insert([
          {name: 'Breakfast', goal_calories: 650},
          {name: 'Lunch', goal_calories: 650},
          {name: 'Dinner', goal_calories: 650},
          {name: 'Snacks', goal_calories: 250}
        ])
      }).then(function() {
        knex('food_meals').del()
          .then(function () {
            // Inserts seed entries
            return knex('food_meals').insert([
              {meal_id: 1, food_id: 1},
              {meal_id: 1, food_id: 2},
              {meal_id: 1, food_id: 3},
              {meal_id: 1, food_id: 1},
              {meal_id: 2, food_id: 1},
              {meal_id: 2, food_id: 4},
              {meal_id: 2, food_id: 2},
              {meal_id: 2, food_id: 3},
              {meal_id: 3, food_id: 1},
              {meal_id: 3, food_id: 1},
              {meal_id: 3, food_id: 2},
              {meal_id: 3, food_id: 3}
            ])
          })
        done() })
      })
  })




  describe('Get /api/meals', function () {
    it('returns a nested object with all of the meal items', function (done) {
      this.request.get('api/meals', function (error, response) {
        if (error) { done(error) }
        eval(pry.it)
        let body = JSON.parse(response.body)
        assert.equal(parsedFoods.length, 1)
        done()
      })
    })
  })
})
