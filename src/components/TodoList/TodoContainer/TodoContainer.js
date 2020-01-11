import React from "react";
import Todo from "../Todo/Todo";

const TodoControl = props => {
  let todo = "Nothing to do";
  if (props.todo) {
    todo = <Todo todo={props.todo} />;
  }

  return (
    <div>
      <p>TodoControl</p>
      {todo}
      <button>Delete</button>
      <button>Complete</button>
      <button>Reset</button>
    </div>
  );
};

export default TodoControl;
