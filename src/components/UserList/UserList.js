import React from "react";
import User from "../../containers/User/User";

const UserList = props => {
  let userList = "No users found! Start by adding them!";
  if (props.users != null) {
    userList = props.users.map(user => <User key={user.id} user={user} />);
  }
  return <div>Userlist:{userList}</div>;
};

export default UserList;
