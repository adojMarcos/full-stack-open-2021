const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const Contact = require('./models/contact');
const app = express();

morgan.token('person', function (req, res) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
});

const errorHandler = (error, request, response, next) => {
  //console.error(error.message)
  console.log(error.name);
  if(error.name === 'CastError'){
    return response.status(400).send({ error: 'malformated id' });
  }else if(error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(morgan(':person'));

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>');
});

app.get('/api/persons', (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts);
  });
});

app.get('/info', (request, response) => {
  Contact.find({}).then(contacts => {
    const date = new Date();
    response.send(`<h3>Phonebook has info for ${contacts.length} people</h3>
                      ${date}`);
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(contact => {
      if(contact){
        response.json(contact);
      }else{
        response.status(404).end();
      }
    })

    .catch(error => {
      next(error);
    });
});

app.delete('/api/persons/:id', (request, response) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => response.status(404).end());
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  if (!body.name) {
    return response.status(404).json({
      error: 'content missing',
    });
  }
  const contact = new Contact({
    name: body.name,
    number: body.number
  });

  contact.save().then(savedNote => {
    response.json(savedNote);
  })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const contact = {
    name: body.name,
    number: body.number
  };

  Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
    .then(updatedContact => {
      response.json(updatedContact);
    })
    .catch(error => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});