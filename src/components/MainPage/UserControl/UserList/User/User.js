import React, { useState, useEffect, useCallback } from "react";

import axiosinstance from "../../../../../axios-todo";
import styles from "./User.module.css";
import UserDetails from "./UserDetails/UserDetails";
import UploadAvatar from "./UploadAvatar/UploadAvatar";
import UserForm from "../../UserForm/UserForm";
import TodosContainer from "../../../../TodosContainer/TodosContainer";

const User = props => {
  const [edit, setEdit] = useState(false);

  const {
    id,
    name,
    email,
    password,
    confirmPassword,
    avatarPath,
    onUpdate
  } = props.user;

  const handleUserChange = useCallback(user => {
    props.onUpdate(props.user.id, user);
    setEdit(false);
  });

  let userCard = (
    <UserDetails
      name={name}
      email={email}
      handleAvatarChange={handleUserChange}
      avatarPath={avatarPath}
    />
  );
  if (edit) {
    userCard = (
      <UserForm
        name={name}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        onFormSubmit={handleUserChange}
        buttonText={"Edit User"}
      />
    );
  }
  return (
    <div className={styles.UserCard}>
      {userCard}
      <UploadAvatar userId={id} onAvatarChange={handleUserChange} />
      <button onClick={() => props.onDelete(id)}>Delete user!</button>
      <button onClick={() => setEdit(!edit)}>
        {!edit ? "Edit" : "View"} user!
      </button>
      <TodosContainer userId={id} />
    </div>
  );
};

export default User;
