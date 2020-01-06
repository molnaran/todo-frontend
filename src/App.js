import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>{this.state.msg !== null ? this.state.msg : null}</div>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
