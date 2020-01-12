import React from "react";
import User from "./User/User";

const UserList = props => {
  let userList = "No users found! Start by adding them!";

  if (props.users != null) {
    userList = props.users.map(user => (
      <User
        key={user.id}
        user={user}
        onDelete={props.onDelete}
        onUpdate={props.onUpdate}
      />
    ));
  }
  return <div>{userList}</div>;
};

export default UserList;
