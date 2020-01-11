import React from "react";

import TodoContainer from "./TodoContainer/TodoContainer";

const TodoList = props => {
  let todos = "No todos found! Start by adding them!";

  if (props.todos) {
    todos = props.todos.map(todo => (
      <TodoContainer key={todo.id} todo={todo} deleted={props.deleted} />
    ));
  }
  return <div>TodoList{todos}</div>;
};

export default TodoList;
