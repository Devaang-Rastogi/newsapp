import "./App.css";
import NavBar from "./components/NavBar";
import News from "./components/News.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Component } from "react";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  state={
    progress:0
  }
  setProgress = (progress) => {
    this.setState({progress:progress})
  }
    render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
          />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} key="home" />}></Route>
            <Route
              path="/business"
              element={<News setProgress={this.setProgress} key="business" category="business" />}
            ></Route>
            <Route
              path="/entertainment"
              element={<News setProgress={this.setProgress} key="entertainment" category="entertainment" />}
            ></Route>
            <Route
              path="/general"
              element={<News setProgress={this.setProgress} key="general" category="general" />}
            ></Route>
            <Route
              path="/health"
              element={<News setProgress={this.setProgress} key="health" category="health" />}
            ></Route>
            <Route
              path="/science"
              element={<News setProgress={this.setProgress} key="science" category="science" />}
            ></Route>
            <Route
              path="/sports"
              element={<News setProgress={this.setProgress} key="sports" category="sports" />}
            ></Route>
            <Route
              path="/technology"
              element={<News setProgress={this.setProgress} key="technology" category="technology" />}
            ></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}
