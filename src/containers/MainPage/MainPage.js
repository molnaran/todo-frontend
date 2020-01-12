import React, { Component } from "react";
import UserList from "../../components/UserList/UserList";

import axiosinstance from "../../axios";

class MainPage extends Component {
  state = { users: [], hasError: false, loading: false };

  async componentDidMount() {
    try {
      this.setState({ loading: false, hasError: false });
      let result = await axiosinstance.get("http://localhost:8080/api/user/");

      this.setState({
        users: result.data,
        loading: false
      });
    } catch (e) {
      this.setState({ hasError: true, loading: false });
    }
  }

  render() {
    let users = null;
    if (this.state.loading) {
      users = "Loading...";
    }
    if (this.state.error) {
      users = "Error during api call, try restarting the server!";
    }
    if (this.state.users) {
      users = <UserList users={this.state.users} />;
    }

    return <div>{users}</div>;
  }
}

export default MainPage;
