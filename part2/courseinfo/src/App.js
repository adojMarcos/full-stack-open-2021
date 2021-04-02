import React from "react";
import Course from "./Course"

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 11,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 21,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 31,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 41,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 12,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 22,
        },
      ],
    },
  ];

  return <Course key={99} courses={courses} />;
};

export default App;
