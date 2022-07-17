import React from "react";
import styled from "styled-components";

const CourseCard = (props) => {
  return (
    <Container onClick={props.onClick}>
      <div className="big-dot dot"></div>
      <div className="small-dot dot"></div>
      <div className="thumbnail">
        <img src={props.data.image} alt="thumbnail" />
        <div className="background"></div>
      </div>
      <div className="title">{props.data.name}</div>
    </Container>
  );
};

export default CourseCard;

const Container = styled.div`
  width: 230px;
  height: 250px;
  background-color: var(--bg-clr);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0 5px 2px var(--bg-clr);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }

  .dot {
    background-color: var(--bg-dot);
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    z-index: 10;
  }

  .big-dot {
    width: 150px;
    height: 150px;
    right: 0%;
    bottom: -30%;
  }

  .small-dot {
    width: 100px;
    height: 100px;
    left: 0;
    top: -20%;
  }

  .thumbnail {
    width: 100%;
    height: 70%;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .background {
      width: 100%;
      height: 100%;
      background-color: var(--bg-clr);
      opacity: 0.5;
      position: absolute;
      top: 0;
    }
  }

  .title {
    width: 100%;
    height: 30%;
    font-weight: var(--font-w-4);
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    pointer-events: none;
    text-align: center;
  }
`;
