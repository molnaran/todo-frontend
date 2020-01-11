import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import axios from "axios";
import MainPage from "./containers/MainPage/MainPage";

class App extends Component {
  state = {
    msg: null
  };

  async componentDidMount() {
    try {
      let result = await axios.get("http://localhost:8080/api/hello");
      this.setState({
        msg: result.data
      });
    } catch (e) {
      this.setState({ msg: "Can't connect to server!" });
    }
  }

  render() {
    return (
      <div>
        <Layout>
          <MainPage />
        </Layout>
      </div>
    );
  }
}

export default App;
