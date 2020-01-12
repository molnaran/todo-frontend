import React from "react";

import TodoContainer from "./TodoContainer/TodoContainer";

const TodoList = props => {
  let todos = "No todos found! Start adding them!";
  console.log(props.todos.length);
  if (props.todos && props.todos.length > 0) {
    todos = props.todos.map(todo => (
      <TodoContainer key={todo.id} todo={todo} deleted={props.deleted} />
    ));
  }
  return <div>{todos}</div>;
};

export default TodoList;
