const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);
const pry = require('pryjs')

function find(name) {
  return database.raw(
    `SELECT foods.name, foods.calories
    FROM food_meals, meals, foods
    WHERE meals.id = food_meals.meal_id
    AND food_meals.food_id = foods.id
    and meals.name = ?`, [(name.charAt(0).toUpperCase() + name.slice(1))]) 
}

module.exports = {
  find
}
