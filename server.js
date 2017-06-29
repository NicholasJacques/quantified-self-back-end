// server.js
var express = require('express')
var app = express()

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self API'

app.get('/api/foods', function(request, response) {
  //return all foods that are active
  //or only return foods that match parameter
})

app.get('/api/foods/:id', function(request, response) {
  //return single food by id
})

app.post('/api/foods', function(request, response) {
  //create new food
  //return success, and food object
})

app.delete('/api/foods/:id', function(request, response) {
  //set active status to false
  //return success

})

app.patch('/api/foods/:id', function(request, response) {
  //edit food
  //return food object
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
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app
