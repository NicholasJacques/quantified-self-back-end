const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

// database.raw('SELECT * FROM foods, meals')
// .then( function(data) {
//   console.log(data.rows)
//   process.exit();
// });

database.raw(
  `SELECT foods.name, foods.calories
  FROM food_meals, meals, foods
  WHERE meals.id = food_meals.meal_id
  AND food_meals.food_id = foods.id
  and meals.name = 'Dinner'
`
  ).then( function(data) {
  console.log(data)
  process.exit();
})
