
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.locals.title = 'Photo Trapper Keeper';

app.use(express.static('public'))













app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} running on localhost:${app.get('port')}.`);
});

module.exports = { app, database };