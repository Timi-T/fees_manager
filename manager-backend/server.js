/* eslint import/no-extraneous-dependencies: "off" */

// Create server Object

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');

const app = express();
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.listen(5002, () => console.log('App listening on port 5002!'));
