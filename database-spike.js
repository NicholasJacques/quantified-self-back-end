const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

database.raw('SELECT * FROM foods, meals')
.then( function(data) {
  console.log(data.rows)
  process.exit();
});

// database.raw(
//   `SELECT *.foods,
//   name.meals as meal 
//   FROM food_meals, meals, foods
//   WHERE id.meals = meal_id.food_meals
//   AND id.foods = food_id.food_meals
//   GROUP BY meal`
//   ).then( function(data) {
//   console.log(data.rows)
//   process.exit();
// })