# Read me

## how to setup and connect to the database
In terminal, start psql:
`psql postgres`  
in psql run the following:  
`CREATE USER shopping_user WITH PASSWORD 'password123';` 
`CREATE DATABASE shopping;`  
`CREATE DATABASE shopping_test;`  
`\c shopping` 
`GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;`  
`\c shopping_test` 
`GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;`  
to test that it is working run `\dt` and it should output "No relations found."  

## what ports the backend and database are running on
port: `3000`  
database: `shopping_test`  
default user: `shopping_user`  

## package installation instructions

install yarn `npm install yarn -g`\
install db-migrate on the machine for terminal commands `npm install db-migrate -g`\
check node version `node -v`
it needs to be 10 or 12 level.  
If node was not 10 or 12 level, run `npm install -g n 10.18.0`\
`PATH="$PATH"`\
use `node -v` to check that the version is 10 or 12\
install all project dependencies `yarn` 

## Set up db table creation  
In terminal, run the following to setup the default product, user, and order.\
`db-migrate up`

## Instructions to run the tests 
`npm run test` 



