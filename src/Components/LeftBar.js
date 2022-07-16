//dependencies
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LeftBar = () => {
  return (
    <Container>
      <Link to="/">
        <div className="home item">Home</div>
      </Link>
      <Link to="/requests">
        <div className="showCourseRequests item">Show Course Requests</div>
      </Link>
      <Link to="/create">
        <div className="addCourse item">Add new Course</div>
      </Link>
    </Container>
  );
};

export default LeftBar;

const Container = styled.div`
  width: 320px;
  height: calc(100vh - 70px);
  background-color: var(--bg-clr);
  position: fixed;

  .item {
    padding: 15px 20px;
    padding-left: 40px;
    border-top: 1px solid var(--border-clr);
    border-bottom: 1px solid var(--border-clr);
    font-size: 0.9rem;
    cursor: pointer;
    position: relative;
    z-index: 1;
    color: var(--txt-clr-gray);
    font-weight: var(--font-w-3);

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 100%;
      bottom: 0;
      background-color: var(--txt-clr);
      transition: all 0.3s ease;
      z-index: -1;
    }

    &:hover {
      color: var(--bg-clr);

      &::after {
        right: 0%;
      }
    }

    &:last-of-type {
      border-top: none;
    }
  }
`;
