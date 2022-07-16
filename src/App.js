//dependencies
import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//components
import Header from "./Components/Header";
import Home from "./Components/Home";
import LeftBar from "./Components/LeftBar";
import AddCourse from "./Components/AddCourse";

const App = () => {
  return (
    <Router>
      <Container>
        <div className="small-dot dot"></div>
        <div className="big-dot dot"></div>
        <Header />
        <div className="main-content">
          <LeftBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/create" element={<AddCourse />} />
          </Routes>
        </div>
      </Container>
    </Router>
  );
};

export default App;

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  z-index: 0;

  .dot {
    position: absolute;
    background-color: var(--bg-dot);
    border-radius: 50%;
    filter: blur(150px);
    z-index: -1;
  }

  .small-dot {
    width: 400px;
    height: 400px;
    top: 100px;
    left: 300px;
  }

  .big-dot {
    width: 500px;
    height: 500px;
    bottom: 0;
    right: 0;
  }
`;
