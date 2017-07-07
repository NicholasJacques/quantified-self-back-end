const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);
const pry = require('pryjs')

function find(name) {
  return database.raw(
    `SELECT food_meals.id, foods.name, foods.calories
    FROM food_meals, meals, foods
    WHERE meals.id = food_meals.meal_id
    AND food_meals.food_id = foods.id
    and meals.name = ?`, [(name.charAt(0).toUpperCase() + name.slice(1))])
}

function addFood(foodId, mealName) {
  return database.raw(`INSERT INTO food_meals (food_id, meal_id)
                VALUES (?, (SELECT id FROM meals WHERE name = ?))`, [foodId, (mealName.charAt(0).toUpperCase() + mealName.slice(1))])
}

function removeFood(foodMealId) {
  return database.raw(`DELETE FROM food_meals WHERE id = ?`, [foodMealId])
}

module.exports = {
  find,
  addFood,
  removeFood
}
