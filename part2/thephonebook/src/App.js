import React, { useState, useEffect } from "react";
import Filter from "./components/Filter.js";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Message from "./components/Message"
import contacts from "./services/contacts";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    contacts.getAll().then((initialContacts) => setPersons(initialContacts));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const found = persons.some((person) => {
      return person.name === newName;
    });
    if (found) {
      const replace = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (replace) {
        const [toReplace] = persons.filter((person) => person.name === newName);
        contacts
          .update(toReplace.id, newPerson)
          .then((returnedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id !== toReplace.id ? person : returnedPerson
              )
            )
          )
          .catch(error => {
            setSuccessMessage(`Error: Information of ${newName} has already been removed from the server`)
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          });
      } else {
        setNewName("");
        setNewNumber("");
        return;
      }
    } else {
      contacts.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
    }
    setSuccessMessage(
      found ? `${newName} number was updated` : `Added ${newName}`
    );

    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
    setNewName("");
    setNewNumber("");
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const input = event.target.name;
    input === "name" ? setNewName(value) : setNewNumber(value);
  };

  const handleFilter = (event) => {
    const value = event.target.value;
    setFilter(value);
  };

  const deleteContact = (id) => {
    contacts.remove(id).then((updatedContacts) => {
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={successMessage} />
      <Filter handleFilter={handleFilter} filter={filter} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        deleteContact={deleteContact}
        persons={persons}
        filter={filter}
      />
    </div>
  );
};

export default App;
