import React from "react";

const Todo = props => {
  const { dueDate, title, description, done } = props.todo;
  return (
    <div>
      <p>Duedate: {dueDate}</p>
      <p>Title: {title}</p>
      <p>Description: {description}</p>
      <p>Done: {done ? "Pipa" : "Nincs pipa"}</p>
    </div>
  );
};

export default Todo;
