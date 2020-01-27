# Onion Architecture Boilerplate

### DESCRIPTION

This repository is a real life example of Onion Architecture with use of `Node.js / Express` and `Typescript`

##### Technologies used

1. `Typescript` ( `v3.1.6 / 3.5.1` )
2. `Inversify.js`
3. `TypeOrm`
4. `Express.js`
5. `Mocha / Chai` for testing

##### Structure

1. core ( `Application Core` )
    
        Contains application core related layers like application services, domain and domain services
        
2. dependency ( `Dependency injection layer` )

        Contains definition for Container and whole project dependencies
        
3. infrastructure 

        Contains definition of data sources in case of this boilerplate - database
        
4. ui

        Contains definition of presentation layer like controller, express setup etc  
        
##### What is supported?

1. Multiple environment setup
2. DB Agnostic setup, supports multiple datasource
3. Infrastructure -> Domain Mapping ( more TODO )
4. Migrations, Fixtures ( example TODO )    
5. Multiple API versions support             

##### Reference

Inspired by following articles:

https://dev.to/remojansen/implementing-the-onion-architecture-in-nodejs-with-typescript-and-inversifyjs-10ad

https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together

https://www.slideshare.net/matthidinger/onion-architecture

### PREREQUISITIES

* `Yarn`
* `NVM` ( tested on `v10.13.0+`)
      
      wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash`
* `PostgreSQL` ( tested on `v11+`)

### SETUP

1. **Database**
    * Look at the `ormconfig.sample.js` file. It's a sample setup of database connection,
      you can provide your own data for database if needed. From app perspective you have to manually
      create database for development ( in sample with name `onion_dev` ) and for testing `onion_test`.
    * Migrations will autorun on application start 
2. **Env Variables**
    * `.env.example` contains example env config - for local / dev use you can use same values as provided
       in sample
    * for production use generate token with following command
    
            node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"   
       
### HOW TO RUN LOCALLY

1. Follow `SETUP` section first and install `PREREQUISITIES`
2. `Yarn install` - installing dependencies
3. `Yarn dev` - run app with watch and rebuild

### WORKING WITH DATABASE

1. To prepare database with latest migrations run `yarn db:reload`,
   it also removes all data from db and recreates it. Useful when playing with seed data.
2. To seed database run `yarn db:seed`   
2. To generate migration based on changes in entity object run `yarn db:generate <my_migration_name>`

### SWAGGER

When there is a swagger host provided in `.env` file then you can navigate to `http://localhost:3000/api-docs/`

Update `swagger.json` file located at `ui > config` every time you apply changes to api.
          
### TESTING

1. Prepare tests database first ( `SETUP SECTION` )
2. Run `Yarn test` - should run mocha tests in parallel when available

### STILL TODO

* Improve Eslint and introduce prettier
* Provide more complex examples working with repositories - ( working with transactions etc )
* Provide examples for UI mappers and explain approach
* Prepare FP version of architecture
* Introduce Graphql and integration with inversify-graphQL
* Add fixtures readme and examples with tests integration
* Add unit tests examples for boilerplate
* Add database tests examples
* Resolve TODO's comments
* Cleanup and see what can be moved to .env
* Add mutational testing
* Add mapping for Application core layer?
* On complete update `CHANGELOG.MD` and tag v1

### KNOWN ISSUES

* Seeds issue - currently using external repository with patch, when this PR is merged move to newest version
  `https://github.com/w3tecch/typeorm-seeding/pull/18`

* To authenticate provide token this way as swagger 2.0 do not support bearer strategy 
`https://github.com/OAI/OpenAPI-Specification/issues/583#issuecomment-267554000`
