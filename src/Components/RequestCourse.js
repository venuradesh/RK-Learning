import { findAllByDisplayValue } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "../firebase";

function RequestCourse({ details }) {
  const [course, setCourse] = useState();

  const collectionRefCourse = firebase.firestore().collection("course");
  const collectionRefUser = firebase.firestore().collection("user");

  const onBoughtClick = (id, index) => {
    const obj = {
      id: id,
      isBuy: false,
    };

    const newObj = {
      id: id,
      isBuy: true,
    };
    collectionRefUser.doc(details.id).onSnapshot((snap) => {
      snap.data().course.map((item) => {
        if (item.id === id) {
          collectionRefUser
            .doc(details.id)
            .update(`course`, firebase.firestore.FieldValue.arrayRemove(obj))
            .then(() => {
              collectionRefUser
                .doc(details.id)
                .update(`course`, firebase.firestore.FieldValue.arrayUnion(newObj))
                .then(() => {
                  console.log("done");
                });
            });
        }
      });
    });
  };

  const onCourseRender = (id) => {
    collectionRefCourse
      .doc(id)
      .get()
      .then((docs) => {
        setCourse({ ...docs.data() });
      });
  };

  return (
    <Container>
      <div className="id-container">
        <span>User Id: </span> {details.id}
      </div>
      <div className="course-container">
        {details.course.map((item, index) => (
          <div className="course-wrapper" key={index}>
            {onCourseRender(item.id)}
            {course ? (
              <>
                <div className="courseDp">
                  <img src={course.image} alt="Course Thumbnail" />
                  <div className="background-color"></div>
                </div>
                <div className="course-details">
                  <div className="content-container">
                    <div className="title">{course.name}</div>
                    <div className="price">Rs. {course.price}</div>
                  </div>
                  <div className="btn-container">
                    <div className="bought" onClick={() => onBoughtClick(item.id, index)}>
                      Bought
                    </div>
                    <div className="not-yet">Not Yet</div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
}

export default RequestCourse;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;

  .id-container {
    width: 100%;
    height: 50px;
    font-size: 1.3rem;
    margin-bottom: 20px;
    background-color: var(--bg-clr);
    position: fixed;
    display: flex;
    align-items: center;
    column-gap: 10px;
    padding: 0 20px;
    border-radius: 8px;
    box-shadow: 0 0 5px 2px var(--bg-clr);

    span {
      color: var(--txt-clr-gray);
      font-size: 1rem;
    }
  }

  .course-container {
    width: 100%;
    height: calc(100% - 70px);
    overflow: hidden;
    overflow-y: auto;
    position: relative;
    top: 70px;

    .course-wrapper {
      width: 100%;
      height: 200px;
      background-color: var(--bg-clr);
      border-radius: 8px;
      box-shadow: 0 0 5px 2px var(--bg-clr);
      display: flex;
      align-items: center;
      column-gap: 20px;
      overflow: hidden;
      z-index: 1;

      .courseDp {
        width: 200px;
        min-width: 200px;
        height: 100%;
        display: flex;
        overflow: hidden;
        position: relative;
        z-index: 1;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .background-color {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: var(--bg-clr);
          opacity: 0.5;
        }
      }

      .course-details {
        width: 100%;
        padding: 20px 20px 20px 0px;
        display: flex;
        flex-direction: column;
        row-gap: 30px;

        .content-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .title {
            font-size: 1.3rem;
          }

          .price {
            font-size: 0.8rem;
            color: var(--txt-clr-gray);
          }
        }

        .btn-container {
          width: 100%;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          column-gap: 20px;

          .bought,
          .not-yet {
            width: 200px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--txt-clr-gray);
            cursor: pointer;
            color: var(--txt-clr-gray);
            transition: all 0.3s ease;

            &:hover {
              border-color: var(--txt-clr);
              color: var(--txt-clr);
            }
          }
        }
      }
    }
  }
`;
