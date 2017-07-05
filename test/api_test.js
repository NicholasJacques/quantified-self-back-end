const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const Food = require('../lib/models/food')
const pry = require('pryjs')

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
      this.request.get('/api/foods/45', function(error, response){
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

  describe('POST /api/foods', function() {
    it('returns a 404 with invalid params', function(done) {
      
    })
  })
})
