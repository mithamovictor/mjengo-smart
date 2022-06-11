# Fullstack Mjengo Smart Assignment Project 

This is a project for a **MERN** *(MySql, Express, React, Nodejs)* stack Crud App. It is packaged as a single app. This is advantegeous in case of the need to containerize the app and deploy is as one. It however, can be split into two parts, client and server apps as they all run independent of each other.

## Requirements
- Nodejs
- Mysql
- Sequelize CLI [Documentation can be found here](https://sequelize.org/)

## Setup
Once you have setup the above requirements, ```cd``` to the root directory of the app and run ```npm install```. This will install the depencency required to run the app as one. Once this is done, run ```npm run setup``` to install dependencies for the client app and those of the server app.

### Database setup
Open the directory in your preferred editor to edit the ```config.json``` file in the server/db/models.

```
{
  "development": {
    "username": "",
    "password": "",
    "database": "mj_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "",
    "password": "",
    "database": "mj_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "",
    "password": "",
    "database": "mj_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

Update the username, password and database parameters to your need in the development object. Once done, open your terminal and run the following scripts to setup your database:

#### Create the database
```
npx sequelize-cli db:create
```

#### Run the migrations
```
npx sequelize-cli db:migrate
```

#### Run the seeders
This will inject default user and roles to the database
```
npx sequelize-cli db:seed:all
```

We are done with the database setup.

### Spin up Application
To spin up the application run ```npm start``` in the root of the directory. This will run both the client and the server concurrently with watch capabilities.

### Default user
```
Email: vickarungaru@gmail.com
Password: Victor123.
```

All done!
