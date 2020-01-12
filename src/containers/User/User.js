import React, { Component } from "react";
import TodoList from "../../components/TodoList/TodoList";

import axiosinstance from "../../axios";

class User extends Component {
  state = {
    loading: false,
    hasError: false,
    todos: []
  };

  async componentDidMount() {
    try {
      this.setState({ loading: false, hasError: false });
      let result = await axiosinstance.get(
        "http://localhost:8080/api/user/" + this.props.user.id + "/todo/"
      );

      this.setState({
        todos: result.data,
        loading: false
      });
    } catch (e) {
      this.setState({ hasError: true, loading: false });
    }
  }

  handleAddTodo = async todo => {
    try {
      this.setState({ loading: false, hasError: false });
      let result = await axiosinstance.post(
        "http://localhost:8080/api/user/" + this.props.user.id + "/todo/",
        todo
      );

      const todos = [...this.state.todos, result.data];
      this.setState({
        todos: todos,
        loading: false
      });
    } catch (e) {
      this.setState({ hasError: true, loading: false });
    }
  };

  handleRemoveTodo = async todoId => {
    try {
      this.setState({ loading: false, hasError: false });
      let result = await axiosinstance.delete(
        "http://localhost:8080/api/todo/" + todoId
      );

      const todos = this.state.todos.filter(todo => todo.id !== result.data.id);
      this.setState({
        todos: todos,
        loading: false
      });
    } catch (e) {
      this.setState({ hasError: true, loading: false });
    }
  };

  handleUpdateTodo = async (todoId, todo) => {
    try {
      this.setState({ loading: false, hasError: false });
      let result = await axiosinstance.patch(
        "http://localhost:8080/api/todo/" + todoId,
        todo
      );

      let todoIndex = this.state.todos.findIndex(todo => {
        return todo.id === todoId;
      });
      const updatedTodo = result.data;
      let todos = [...this.state.todos];
      todos = [
        ...todos.slice(0, todoIndex),
        updatedTodo,
        ...todos.slice(todoIndex + 1)
      ];

      this.setState({
        todos: todos,
        loading: false
      });
    } catch (e) {
      this.setState({ hasError: true, loading: false });
    }
  };

  render() {
    const { id, name, avatarPath, email } = this.props.user;
    let todos = "Time to add some todos!";
    if (this.state.todos.length) {
      todos = <TodoList userId={id} todos={this.state.todos} />;
    }
    const todo = {
      dueDate: "2020-01-20 22:11:03",
      title: "Idared alma evés",
      description: "Szőlő!"
    };
    return (
      <div>
        <p>Id: {id}</p>
        <p>Name: {name}</p>
        <p>AvatarPath: {avatarPath}</p>
        <p>Email: {email}</p>
        {todos}
        <button onClick={() => this.handleAddTodo(todo)}>Add todo</button>
        <button onClick={() => this.handleRemoveTodo(1)}>Remove todo</button>
        <button onClick={() => this.handleUpdateTodo(2, todo)}>
          Update todo
        </button>
      </div>
    );
  }
}

export default User;
