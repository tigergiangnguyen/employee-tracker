const express = require('express');
const inquirer = require('inquirer');
const table = require('console.table');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware for POST and PUT requests (req.body)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => console.log(`Server now listening at http://localhost:${PORT}`));