import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from    "./components/common/header/Header"  
import Stopwatch from "./components/stopwatch/Stopwatch";
import Timmer from "./components/timmer/Timmer"

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container">

        <Routes>
          <Route path="/" element={<Stopwatch />} />
          <Route path="/timer" element={<Timmer />} />
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;