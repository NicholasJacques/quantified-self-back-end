# quantified-self-back-end

##Setup:
 + Clone down repo
 + run `npm install`
 + run `npm install knex -g` if you haven't globally installed knex before
 + enter `psql` run `CREATE DATABASE quantified_self; CREATE DATABASE quantified_self_test;`
 + run `knex migrate:latest`
 + run `knex seed:run`
 + run knex `migrate:latest --env test`
 + to run tests `npm test`
 + to start server `npm start`

 ##API endpoints:

+ GET /api/foods/ returns JSON object with all foods, food ids, calories
+ GET /api/foods/:id returns JSON object with food, food id, calories
+ POST /api/foods/:id Takes JSON body with name and calories, returns food with :id
+ DELETE /api/foods/:id deletes food with :id
+ PATCH /api/foods/:id Takes JSON body and updates record at :id, returns all foods
+ GET /api/meals/:name returns all foods associated with meal, ids reference food_meal not food
+ POST /api/meals/:name takes foodid in body as JSON adds it to :meal, returns all foods for meal
+ DELETE /api/meals/:name takes foodMealid(id of row) in body as JSON removes it to :meal, returns all foods for meal
