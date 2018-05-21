
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.locals.title = 'Photo Trapper Keeper';

app.use(express.static('public'));
app.use(bodyParser.json());


app.get('/api/v1/photos', (request, response) => {
  database('photos').select()
    .then(photos => response.status(200).json(photos))
    .catch(error => response.status(404).json('Path not found'))
})

app.post('/api/v1/photos', (request, response) => {
  const photo = request.body;

  database('photos').insert(photo, ['title', 'url'])
    .then(photo => response.status(201).json(photo[0]))
    .catch(error => response.status(422).json(error))
})

app.delete('/api/v1/photos/:id', (request, response) => {
  database('photos').where('id', request.params.id).del()
    .then(photo => response.status(204).json(request.params.id))
    .catch(error => response.status(404).json(error))
})









app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} running on localhost:${app.get('port')}.`);
});

module.exports = { app, database };