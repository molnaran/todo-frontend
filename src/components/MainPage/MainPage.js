import React, { useState, useEffect } from "react";
import UserList from "./UserControl/UserList/UserList";
import UserForm from "./UserControl/UserForm/UserForm";
import Button from "../UI/Button/Button";

import axiosinstance from "../../axios-todo";

const MainPage = props => {
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [users, setUsers] = useState([]);

  const removeUserHandler = async userId => {
    try {
      setLoading(true);
      setHasError(false);
      let result = await axiosinstance.delete("api/user/" + userId);

      setUsers(prevUsers =>
        prevUsers.filter(user => user.id !== result.data.id)
      );
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setHasError(true);
    }
  };

  const addUserHandler = async user => {
    try {
      setLoading(true);
      setHasError(false);
      let result = await axiosinstance.post("api/user/", user);
      const addedUser = result.data;
      setUsers(prevUsers => [...prevUsers, addedUser]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setHasError(true);
    }
  };

  const updateUserHandler = async (userId, user) => {
    try {
      setLoading(true);
      setHasError(false);
      let result = await axiosinstance.patch("api/user/" + userId, user);

      const updatedUser = result.data;

      setUsers(prevUsers => {
        let userIndex = prevUsers.findIndex(user => {
          return user.id === userId;
        });
        return [
          ...prevUsers.slice(0, userIndex),
          updatedUser,
          ...prevUsers.slice(userIndex + 1)
        ];
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let result = await axiosinstance.get("api/user/");
        setUsers(prevUsers => [...prevUsers, ...result.data]);
      } catch (e) {}
    };
    fetchUsers();
  }, []);

  let userContent = null;
  if (loading) {
    userContent = "Loading...";
  }
  if (hasError) {
    userContent = "Error during api call, try restarting the server!";
  }
  if (users) {
    userContent = (
      <UserList
        onDelete={removeUserHandler}
        users={users}
        onUpdate={updateUserHandler}
      />
    );
  }

  return (
    <div>
      <button
        onClick={() =>
          setShowCreateUser(prevShowCreateUser => !prevShowCreateUser)
        }
      >
        {" "}
        Show add user!
      </button>
      {userContent}
      {showCreateUser && <UserForm onFormSubmit={addUserHandler} />}
    </div>
  );
};

export default MainPage;
