import React from "react";

const Persons = (props) => {
  return (
    <>
      {props.filter === ""
        ? props.persons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number} <button onClick={()=> props.deleteContact(person.id)}>delete</button>
            </p>
          ))
        : props.persons
            .filter((person) =>
              person.name.toLowerCase().includes(props.filter.toLowerCase())
            )
            .map((person) => (
              <p key={person.name}>
                {person.name} {person.number} <button onClick={()=> props.deleteContact(props.person.id)}>delete</button>
              </p>
            ))}
    </>
  );
};

export default Persons;