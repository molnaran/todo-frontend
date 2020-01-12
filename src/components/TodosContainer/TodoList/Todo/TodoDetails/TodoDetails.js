import React from "react";

const TodoDetails = props => {
  const { title, description, dueDate } = props;
  return (
    <div>
      <p>Title: {title}</p>
      <p>Description: {description}</p>
      <p>Duedate: {dueDate} </p>
    </div>
  );
};
export default TodoDetails;
