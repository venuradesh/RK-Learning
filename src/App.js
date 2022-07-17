//dependencies
import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

//components
import Header from "./Components/Header";
import Home from "./Components/Home";
import LeftBar from "./Components/LeftBar";
import AddCourse from "./Components/AddCourse";
import Requests from "./Components/Requests";
import Login from "./Components/Login";
import Course from "./Components/Course";

const App = () => {
  const navigate = useNavigate();
  const adminUser = {
    userName: "admin",
    password: "admin",
  };

  const [user, setUser] = useState({ userName: "", password: "" });

  const LoginFunc = (details) => {
    setUser({ userName: details.userName, password: details.password });
    navigate("/");
  };

  const LogoutFunc = () => {
    setUser({ userName: "", password: "" });
    document.location.reload();
  };

  return (
    <>
      {user.userName === adminUser.userName && user.password === user.password ? (
        <Container>
          <div className="small-dot dot"></div>
          <div className="big-dot dot"></div>
          <Header logoutfunc={LogoutFunc} />
          <div className="main-content">
            <LeftBar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path={`/course/:courseId`} element={<Course />} />
              <Route exact path="/create" element={<AddCourse />} />
              <Route exact path={`/requests`} element={<Requests />} />
            </Routes>
          </div>
        </Container>
      ) : (
        <>
          {
            <Container>
              <div className="small-dot dot"></div>
              <div className="big-dot dot"></div>
              <Routes>
                <Route exact path="/login" element={<Login loginfunc={LoginFunc} loginInfo={adminUser} />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </Container>
          }
        </>
      )}
    </>
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
