//dependencies
import React from "react";
import styled from "styled-components";

//components
import Header from "./Components/Header";
import Home from "./Components/Home";
import LeftBar from "./Components/LeftBar";

const App = () => {
  return (
    <Container>
      <div className="small-dot dot"></div>
      <div className="big-dot dot"></div>
      <Header />
      <div className="main-content">
        <LeftBar />
        <Home />
      </div>
    </Container>
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
    width: 300px;
    height: 300px;
    top: 100px;
    left: 100px;
  }

  .big-dot {
    width: 500px;
    height: 500px;
    bottom: 0;
    right: 0;
  }
`;
