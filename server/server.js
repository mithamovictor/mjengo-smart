require('dotenv').config();
const express = require('express');
// const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
// const errorHandler = require('./app/common/errorHandler');
// const connectDB = require('./db');

/**
 * Routers
 */
// const AuthRouter = require('./app/routes/auth.routes');

/**
 * Instantiate Server App
 */
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/**
 * Connect to Mongo DB
 */
// connectDB();

/**
 * Instantiate Routes
 */
// AuthRouter.routesConfig(app);

/**
 * Handle Errors
 */
// app.use(errorHandler);

/**
 * Serve App
 * @port process.env.PORT
 * @default 4000
 */
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
