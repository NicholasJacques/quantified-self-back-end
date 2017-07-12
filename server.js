// server.js
const express = require('express')
const app = express()
const Food = require('./lib/models/food')
const Meal = require('./lib/models/meal')
const pry = require('pryjs')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self API'

app.get('/api/foods', function(request, response) {
  Food.all().then(function(data){
    response.json(data.rows)
  })
})

app.get('/api/foods/:id', function(request, response) {
  Food.find(request.params.id).then(function(data) {
    if (!data.rows[0]){ return response.sendStatus(404)}
    response.json(data.rows[0])
  })
})

app.post('/api/foods', function(request, response) {
  let name  = request.body.name
  let calories  = request.body.calories
  if (!name || !calories) {
    return response.status(422).send({
        error: 'Your order could not be completed'
    })
  }
  Food.create(name, calories).then(function (data) {
    return response.status(201).json(data.rows)
  })
})

app.delete('/api/foods/:id', function(request, response) {
  Food.setInactive(request.params.id).then(function() {
    return response.status(204).send()
  })
})

app.patch('/api/foods/:id', function(request, response) {
  let id = request.params.id
  let food = Food.find(id).then(function(data) {
  const body = request.body

  if (!data.rows[0]) {
    return response.sendStatus(404)
  } else if (body.name || body.calories) {
    Food.update(id, body).then(function(){
      Food.all().then(function(data){
        return response.json(data.rows)
      })
    })
  } else {
  return response.status(422)
  }
  })
})

app.get('/api/meals/:name', function(request, response) {
  Meal.find(request.params.name).then(function(data) {
    if (!data.rows[0]){ return response.sendStatus(404)}
    return response.json(data.rows)
  })
})

app.post('/api/meals/:name', function(request, response){
  let foodId = request.body.id
  let meal = request.params.name

  Meal.addFood(foodId, meal).then(function(x) {
    Meal.find(meal).then(function(data) {
      return response.json(data.rows)
    })
  })
})

app.delete('/api/meals/:name', function(request, response){
  let foodMealId = request.body.id
  let meal = request.params.name

  Meal.removeFood(foodMealId).then(function() {
    Meal.find(meal).then(function(data) {
      return response.json(data.rows)
    })
  })
})

if (!module.parent){
  app.listen(app.get('port'), ()=> {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app
