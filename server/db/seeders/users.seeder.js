require('dotenv').config();
const connectDB = require('..');
const usersData = require('../data/users.data');
const Users = require('../models/users.model');

connectDB();

const importUserData = async () => {
  try {
    await Users.deleteMany({});
    await Users.insertMany(usersData);
    console.log('User data import success');
    return process.exit(0); // Exits with code 0 if process is successful
  } catch (error) {
    console.error('Error with user data import');
    return process.exit(1); // Exits with code 1 if process is unsuccessful
  }
}

importUserData();
