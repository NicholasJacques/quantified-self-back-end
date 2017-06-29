
exports.up = function(knex, Promise) {
  let createQuery = `create table meals(
    id serial primary key not null,
    name text,
    goal_calories integer
  )`
  return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {

};
