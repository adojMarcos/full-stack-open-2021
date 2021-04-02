import React from 'react'

const Header = ({ name }) => {
    return <h1>{name}</h1>;
  };
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((acc, cur) => {
      return acc + cur.exercises;
    }, 0);
    return <p>total of {sum} exercises</p>;
  };
  
  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>
    );
  };
  
  const Content = ({part}) => {
    const [...parts] = part.parts;
    return <div>{parts.map(part => <Part  key={part.id} name={part.name} exercises={part.exercises}/>)}</div>;
  };
  
  const Course = ({ courses }) => {
    return (
      <div>
        {courses.map((course) => {
          return (
            <div key={course.id}>
              <Header key={course.name} name={course.name} />
              <Content key={~course.id} part={course} />
              <Total key={course.id} course={course} />
            </div>
          );
        })}
      </div>
    );
};

export default Course