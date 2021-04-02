import React from "react";

const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => {
  return (
    <>
      <p>
        {props.part1} {props.exercise1}
      </p>
      <p>
        {props.part2} {props.exercise2}
      </p>
      <p>
        {props.part3} {props.exercise3}
      </p>
    </>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part1={props.parts[0].name} exercise1={props.parts[0].exercises} />
      <Part part2={props.parts[1].name} exercise2={props.parts[1].exercises} />
      <Part part3={props.parts[2].name} exercise3={props.parts[2].exercises} />
    </div>
  );
};

const Total = (props) => <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>;

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;