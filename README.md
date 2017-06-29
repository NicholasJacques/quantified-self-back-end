# quantified-self-back-end

##Setup:
 + Clone down repo
 + run `npm install`
 + run `npm install knex -g` if you haven't globally installed knex before
 + enter `psql` run `CREATE DATABASE quantified_self; CREATE DATABASE quantified_self_test;`
 + run `knex migrate:latest`
 + run `knex seed:run`
 + to run tests `npm test`
