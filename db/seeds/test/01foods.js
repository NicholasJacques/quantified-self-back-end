
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('foods').del()
    .then(function () {
      return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE').then(function () {
        return knex('foods').insert([
          {name: 'banana', calories: 80, active: 't'},
          {name: 'egg', calories: 78, active: 't'},
          {name: 'big mac', calories: 563, active: 't'},
          {name: 'crunchwrap supreme', calories: 535, active: 't'}
        ])
      })
    })
}
