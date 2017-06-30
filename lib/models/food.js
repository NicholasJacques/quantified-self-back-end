const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);
const pry = require('pryjs')

function create(name, calories){
  return database.raw(
    'insert into foods (name, calories, active) values (?, ?, ?)',
    [name, calories, 'true'])
}

function drop_all() {
  return database.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
}

function find(id){
  return database.raw('SELECT * FROM foods WHERE id=?', [id])
}

function all(){
  return database.raw('SELECT * FROM foods')
}

module.exports = {
  create: create,
  drop_all: drop_all,
  find: find,
  all: all
}
