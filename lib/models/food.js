const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);
const pry = require('pryjs')

function create(name, calories){
  return database.raw(
    'insert into foods (name, calories, active) values (?, ?, ?)',
    [name, calories, 'true'])
}

function dropAll() {
  return database.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
}

function find(id){
  return database.raw('SELECT * FROM foods WHERE id=?', [id])
}

function all(){
  return database.raw('SELECT * FROM foods WHERE active = true')
}

function update(id, params) {
    if (params.name && params.calories) {
      return database.raw('UPDATE foods SET name = ?, SET calories = ? WHERE id = ?', [params.name, params.calories, id])
    } else if (params.name) {
      return database.raw('UPDATE foods SET name = ? WHERE id = ?', [params.name, id])
    } else if (params.calories) {
      return database.raw('UPDATE foods SET name = ? WHERE id = ?', [params.calories, id])
    }
}

function setInactive(id) {
  return database.raw('UPDATE foods SET active = false WHERE id = ?', [id])
}

module.exports = {
  create,
  dropAll,
  find,
  all,
  update,
  setInactive
}
