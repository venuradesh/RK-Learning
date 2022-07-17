import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";

//components
import CourseCard from "./CourseCard";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const db = firebase.firestore().collection("course");

  const getCourses = () => {
    db.onSnapshot((snap) => {
      const course = [];
      snap.docs.forEach((doc) => {
        course.push({ ...doc.data(), id: doc.id });
      });
      setCourses(course);
      setLoading(false);
    });
  };

  const onCourseCardClick = (courseData) => {
    navigate(`/course/${courseData.id}`);
  };

  useEffect(() => {
    getCourses();
  }, []);

  if (loading) {
    return (
      <Container>
        <div className="loading">Loading</div>
      </Container>
    );
  } else {
    return <Container>{courses ? courses.map((courseData, index) => <CourseCard data={courseData} key={index} onClick={() => onCourseCardClick(courseData)} />) : ""}</Container>;
  }
};

export default Home;

const Container = styled.div`
  width: calc(100vw - 320px);
  max-width: calc(100vw - 320px);
  height: calc(100vh - 70px);
  position: relative;
  left: 320px;
  padding: 25px 50px;
  display: flex;
  flex-wrap: wrap;
  column-gap: 25px;
  row-gap: 25px;
  justify-content: flex-start;
  overflow-x: hidden;
  overflow-y: auto;

  .loading {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .add-new-course {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: var(--bg-clr);
    position: absolute;
    right: 50px;
    bottom: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.3rem;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
    }
  }
`;
