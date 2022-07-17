import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase";

function RequestCard({ courseId, details }) {
  const [courses, setCourses] = useState({});
  const navigate = useNavigate();

  const collectionRefCourse = firebase.firestore().collection("course");
  const collectionRefUser = firebase.firestore().collection("user");

  const onBoughtClick = (id) => {
    console.log("within");
    const obj = {
      id: id,
      isBuy: false,
    };

    const newObj = {
      id: id,
      isBuy: true,
    };
    const unsub = collectionRefUser.doc(details.id).onSnapshot((snap) => {
      snap.data().course.map((item) => {
        if (item.id === id) {
          collectionRefUser
            .doc(details.id)
            .update(`course`, firebase.firestore.FieldValue.arrayRemove(obj))
            .then(() => {
              collectionRefUser.doc(details.id).update(`course`, firebase.firestore.FieldValue.arrayUnion(newObj));
              navigate("/");
            });
        }
      });

      unsub();
    });
  };

  useEffect(() => {
    collectionRefCourse
      .doc(courseId)
      .get()
      .then((res) => {
        setCourses({ ...res.data() });
      });
  }, [courseId]);

  return (
    <>
      {courses ? (
        <div className="course-wrapper">
          <div className="courseDp">
            <img src={courses.image} alt="Course Thumbnail" />
            <div className="background-color"></div>
          </div>
          <div className="course-details">
            <div className="content-container">
              <div className="title">{courses.name}</div>
              <div className="price">Rs. {courses.price}</div>
            </div>
            <div className="btn-container">
              <div className="bought" onClick={() => onBoughtClick(courseId)}>
                Bought
              </div>
              <div className="not-yet">Not Yet</div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default RequestCard;
