const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

database.raw('SELECT * FROM foods, meals')
.then( function(data) {
  console.log(data.rows)
  process.exit();
});
