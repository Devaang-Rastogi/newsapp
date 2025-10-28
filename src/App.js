import "./App.css";
import NavBar from "./components/NavBar";
import News from "./components/News.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import {useState} from 'react';

const App = () =>{
  const [progress,setProgress]=useState(0);

    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar color="#f11946" progress={progress} />
          <Routes>
            <Route
              path="/"
              element={
                <News
                  setProgress={setProgress}
                  key="home"
                  pageSize={8}
                  country="us"
                  category="general"
                />
              }
            ></Route>
            <Route
              path="/business"
              element={
                <News
                  setProgress={setProgress}
                  key="business"
                  pageSize={8}
                  country="us"
                  category="business"
                />
              }
            ></Route>
            <Route
              path="/entertainment"
              element={
                <News
                  setProgress={setProgress}
                  key="entertainment"
                  pageSize={8}
                  country="us"
                  category="entertainment"
                />
              }
            ></Route>
            <Route
              path="/general"
              element={
                <News
                  setProgress={setProgress}
                  key="general"
                  pageSize={8}
                  country="us"
                  category="general"
                />
              }
            ></Route>
            <Route
              path="/health"
              element={
                <News
                  setProgress={setProgress}
                  key="health"
                  pageSize={8}
                  country="us"
                  category="health"
                />
              }
            ></Route>
            <Route
              path="/science"
              element={
                <News
                  setProgress={setProgress}
                  key="science"
                  pageSize={8}
                  country="us"
                  category="science"
                />
              }
            ></Route>
            <Route
              path="/sports"
              element={
                <News
                  setProgress={setProgress}
                  key="sports"
                  pageSize={8}
                  country="us"
                  category="sports"
                />
              }
            ></Route>
            <Route
              path="/technology"
              element={
                <News
                  setProgress={setProgress}
                  key="technology"
                  pageSize={8}
                  country="us"
                  category="technology"
                />
              }
            ></Route>
          </Routes>
        </Router>
      </div>
    );
}

export default App;