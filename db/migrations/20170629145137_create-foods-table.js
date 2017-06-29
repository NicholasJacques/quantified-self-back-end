
exports.up = function(knex, Promise) {
  let createQuery = `create table foods(
    id serial primary key not null,
    active boolean,
    name text,
    calories integer
  )`
  return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = `drop table foods`
  return knex.raw(dropQuery)
};
