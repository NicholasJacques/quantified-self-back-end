
exports.up = function(knex, Promise) {
  let alterQuery = `ALTER TABLE foods
    ALTER COLUMN active SET DEFAULT FALSE`
  return knex.raw(alterQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = `ALTER TABLE foods
    ALTER COLUMN active DROP DEFAULT`
  return knex.raw(dropQuery)
};
