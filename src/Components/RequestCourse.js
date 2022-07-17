import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RequestCard from "./RequestCard";

function RequestCourse({ details }) {
  const [notBuyCourses, setNotBuyCourses] = useState([]);

  useEffect(() => {
    setNotBuyCourses([...details.course.filter((item) => item.isBuy === false)]);
  }, [details]);

  return (
    <Container>
      <div className="id-container">
        <span>User Id: </span> {details.id}
      </div>
      <div className="course-container">{notBuyCourses.length !== 0 && notBuyCourses.map((item, index) => <RequestCard courseId={item.id} key={index} details={details} />)}</div>
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
      margin-bottom: 20px;

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
