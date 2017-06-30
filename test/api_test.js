const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const Food = require('../lib/models/food')
const pry = require('pryjs')

describe("Server", function () {
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
  this.timeout(100000)
  beforeEach(function(done) {
    // Food.create('egg', 95)
    Food.create("banana", 70)
    .then(function() { done() })
  })

  afterEach(function(done) {
    Food.drop_all()
    .then(function() { done() })
  })
  it('should exist', function(){
    assert(app)
  })
  describe('GET /api/foods/', function(){g 

    it('returns all of the foods', function(done){
      this.request.get('/api/foods', function(error, response){
        if (error) {done(error)}
        var parsedFoods = JSON.parse(response.body)
        // eval(pry.it)
        assert.equal(parsedFoods.length, 1)
        done()
      })
    })
  })
  describe('GET /api/foods/:id', function(){
    it('returns a 404 for a non valid id', function(done){
      this.request.get('/api/foods/45', function(error, response){
        if (error){done(error)}
        assert.equal(response.statusCode, 404)
        done()
      })
    })
  })
})
