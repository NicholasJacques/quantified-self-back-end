
exports.up = function(knex, Promise) {
  let createQuery = `create table food_meals(
    id serial primary key not null,
    food_id integer references foods(id),
    meal_id integer references meals(id)
  )`
  return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = `drop table food_meals`
  return knex.raw(dropQuery)
};
