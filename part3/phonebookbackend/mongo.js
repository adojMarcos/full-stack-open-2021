require('dotenv').config();
const mongoose = require('mongoose');

if (process.argv.length < 3 || process.argv.length === 4) {
  console.log('not enough arguments');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

// eslint-disable-next-line no-undef
const url = MONGODB_URI;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model('Contact', contactSchema);

if (process.argv.length === 5) {
  const contact = new Contact({
    name,
    number,
  });

  contact.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else if (process.argv.length === 3) {
  if (password === process.env.PASSWORD) {
    Contact.find({}).then((result) => {
      console.log('phonebook:');
      result.forEach((note) => {
        console.log(note.name, note.number);
      });
      mongoose.connection.close();
    });
  } else {
    console.log('Wrong password');
    mongoose.connection.close();
  }
}
