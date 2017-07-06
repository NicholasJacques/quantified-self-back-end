
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('meals').del()
    .then(function () {
      // Inserts seed entries
      return knex.raw('TRUNCATE meals RESTART IDENTITY CASCADE').then(function () {
        return knex('meals').insert([
          {name: 'Breakfast', goal_calories: 650},
          {name: 'Lunch', goal_calories: 650},
          {name: 'Dinner', goal_calories: 650},
          {name: 'Snacks', goal_calories: 250}
        ])
      })
    })
}
