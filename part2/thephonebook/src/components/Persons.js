import React from "react";

const Persons = (props) => {
  if (props.persons.length !== 0) {
    return (
      <>
        {props.filter === ""
          ? props.persons.map((person, key) => (
              <p key={key}>
                {person.name} {person.number}{" "}
                <button onClick={() => props.deleteContact(person.id)}>
                  delete
                </button>
              </p>
            ))
          : props.persons
              .filter((person) =>
                person.name.toLowerCase().includes(props.filter.toLowerCase())
              )
              .map((person, key) => (
                <p key={key}>
                  {person.name} {person.number}{" "}
                  <button onClick={() => props.deleteContact(props.person.id)}>
                    delete
                  </button>
                </p>
              ))}
      </>
    );
  }
  return 'Loading...'
};

export default Persons;
