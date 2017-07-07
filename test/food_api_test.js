const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const Food = require('../lib/models/food')
const pry = require('pryjs')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

describe("Server", function () {
  this.timeout(100000)

  before(function(done){
    this.port = 9876
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
    Food.create("banana", 70)
    .then(function() { done() })
  })

  afterEach(function(done) {
    Food.dropAll()
    .then(() =>{ done() })
  })

  it('should exist', ()=>{
    assert(app)
  })

  describe('GET /api/foods/', function() {
    it('returns all of the foods', function(done){
      this.request.get('/api/foods', function(error, response){
        if (error) {done(error)}
        var parsedFoods = JSON.parse(response.body)
        assert.equal(parsedFoods.length, 1)
        done()
      })
    })
  })

  describe('GET /api/foods/:id', function() {
    it('returns a 404 for a non valid id', function(done){
      this.request.get('/api/foods/45', function (error, response){
        if (error){done(error)}
        assert.equal(response.statusCode, 404)
        done()
      })
    })

    it('returns the food with a matching id', function(done) {
      let food;
      const request = this.request

      Food.all().then(function(data) {
        food = data.rows[0]
        request.get(`/api/foods/${food.id}`, function(error, response) {
          if (error) {done(error)}

          const parsedResponse = JSON.parse(response.body)

          assert.deepEqual(parsedResponse, food)
          done()
        })
      })
    })
  })

  describe('POST /api/foods', function () {
    it('returns 422 with invalid params', function (done) {
        this.request.post('/api/foods', function (error, response) {
          if (error) { done(error) }
          assert.equal(response.statusCode, 422)
          done()
        })
    })
    it ('returns success code with valid params', function (done) {
      let food = {name: 'egg', calories: 200}
      this.request.post('/api/foods', {form: food}, function (error, response) {
        if (error) { done(error) }
        assert.equal(response.statusCode, 201)
        Food.all().then(function (data) {
          assert.equal(data.rows.length, 2)
        })
        done()
      })
    })
  })

  describe('PATCH /api/foods/:id', function() {
    it('returns a 404 for a non valid id', function(done){
      this.request.patch('/api/foods/45', function (error, response){
        if (error){done(error)}
        assert.equal(response.statusCode, 404)
        done()
      })
    })

    it('returns a success code', function(done) {
      let food;
      const request = this.request

      Food.all().then(function(data) {
        food = data.rows[0]

        request.patch(`/api/foods/${food.id}`, {form: {name: "apricot"}}, function(error, response) {
          if (error) {done(error)}
          Food.find(food.id).then(function(data) {
            assert.equal(data.rows[0].name, "apricot")
          })
          done()
        })
      })
    })
  })

  describe('DELETE /api/foods/:id', function () {
    it('returns a 204 and sets that food to inactive', function(done) {
      let food;
      const request = this.request

      Food.all().then(function(data) {
        food = data.rows[0]

        request.delete(`/api/foods/${food.id}`, function(error, response) {
          if (error) {done(error)}
          Food.all().then(function(data) {
            assert.equal(data.rows.length, 0)
            assert.equal(response.statusCode, 204)
          })
          done()
        })
      })
    })
  })
})
