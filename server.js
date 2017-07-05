// server.js
const express = require('express')
const app = express()
const Food = require('./lib/models/food')
const pry = require('pryjs')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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

app.post('/api/foods', function (request, response) {
  let name  = request.body.name
  let calories  = request.body.calories
  if (!name || !calories) {
    return response.status(422).send({
        error: 'Your order could not be completed'
    })
  }
  Food.create(name, calories).then(function (data) {
    return response.status(201).send()
  })
})

app.delete('/api/foods/:id', function(request, response) {
  //set active status to false
  //return success
})

app.patch('/api/foods/:id', function(request, response) {
  let food = Food.find(request.params.id).then(function(data) {
    const body = request.body

    if (!data.rows[0]){ return response.sendStatus(404)}
    if (body.name || body.calories) {
      Food.update(request.params.id, body).then(function(){
        return response.status(201).send()
      })
    }
    return response.status(422)
  })
})

app.get('/api/meals', function(request, response){
  //return nested JSON with meal[food]
})

app.patch('api/meals/:id', function(){
  //add food(s) to a meal
})
app.delete('api/:meal/:food_id', function(){
  //delete a food from a meal
})

if (!module.parent){
  app.listen(app.get('port'), ()=> {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app
