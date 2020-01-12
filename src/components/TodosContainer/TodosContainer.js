import React, { useEffect, useState } from "react";
import TodoList from "./TodoList/TodoList";
import axiosinstance from "../../axios-todo";

const TodoContainer = props => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        let result = await axiosinstance.get(
          "api/user/" + props.userId + "/todo/"
        );
        setTodos(result.data);
      } catch (e) {}
    };
    fetchTodos();
  }, [props.userId]);

  const updateTodoHandler = async (todoId, todo) => {
    try {
      let result = await axiosinstance.patch("api/todo/" + todoId, todo);

      const updatedTodo = result.data;

      setTodos(prevTodos => {
        let todoIndex = prevTodos.findIndex(todo => {
          return todo.id === todoId;
        });
        return [
          ...prevTodos.slice(0, todoIndex),
          updatedTodo,
          ...prevTodos.slice(todoIndex + 1)
        ];
      });

      console.log(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  const removeTodoHandler = async todoId => {
    try {
      let result = await axiosinstance.delete("api/todo/" + todoId);

      setTodos(prevTodos =>
        prevTodos.filter(todo => todo.id !== result.data.id)
      );
    } catch (e) {}
  };

  const addTodoHandler = async (userId, todo) => {
    try {
      let result = await axiosinstance.post(
        "api/user/" + userId + "/todo/",
        todo
      );
      const addedTodo = result.data;
      setTodos(prevTodos => [...prevTodos, addedTodo]);
    } catch (e) {}
  };

  return (
    <div>
      <TodoList
        todos={todos}
        onUpdate={updateTodoHandler}
        onDelete={removeTodoHandler}
        onAdd={addTodoHandler}
        userId={props.userId}
      />
    </div>
  );
};

export default TodoContainer;
