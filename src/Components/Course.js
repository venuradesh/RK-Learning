import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "../firebase";
import { useParams } from "react-router-dom";

function Course() {
  const [courseDetails, setCourseDetails] = useState({});
  const collectionRefCourse = firebase.firestore().collection("course");
  const { courseId } = useParams();

  useEffect(() => {
    collectionRefCourse
      .doc(courseId)
      .get()
      .then((res) => {
        setCourseDetails({ ...res.data() });
      });
  }, [courseId]);

  return (
    <>
      {courseDetails ? (
        <Container>
          {console.log(courseDetails)}
          <div className="cover-container">
            <img src={courseDetails.image} alt="course thumbnail" />
            <div className="background"></div>
          </div>
          <div className="content-container">
            <div className="title-price-container">
              <div className="title">{courseDetails.name}</div>
              <div className="price">Rs. {courseDetails.price}</div>
            </div>
            {courseDetails.playlist ? (
              <div className="playlist-container">
                {courseDetails.playlist.map((video, index) => (
                  <div className="video-item" key={index}>
                    <div className="video-title">{video.title}</div>
                    <div className="link-time">
                      <a className="video-link" href={video.link} target="_blank">
                        {video.link}
                      </a>
                      <div className="video-time">{video.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
}

export default Course;

const Container = styled.div`
  width: calc(100vw - 320px);
  max-width: calc(100vw - 320px);
  height: calc(100vh - 70px);
  position: relative;
  left: 320px;
  padding: 25px 25px;

  .cover-container {
    width: 100%;
    height: 50%;
    background-color: blue;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-repeat: none;
    }

    .background {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: var(--bg-clr);
      opacity: 0.6;
    }
  }

  .content-container {
    width: 100%;
    height: calc(50% - 25px);
    display: flex;
    column-gap: 25px;
    margin-top: 25px;

    .title-price-container {
      height: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      row-gap: 10px;

      .title {
        font-size: 2rem;
        font-weight: var(--font-w-4);
      }

      .price {
        color: var(--txt-clr-gray);
      }
    }

    .playlist-container {
      flex: 2;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      row-gap: 10px;

      .video-item {
        width: 100%;
        height: 120px;
        display: flex;
        flex-direction: column;
        row-gap: 10px;

        .video-title {
          width: 100%;
          font-size: 1.4rem;
          border-bottom: 1px solid var(--border-clr);
        }

        .link-time {
          display: flex;
          justify-content: space-between;
          color: var(--txt-clr-gray);

          a {
            color: var(--txt-clr-gray);
            transition: all 0.3s ease;

            &:hover {
              color: var(--txt-clr);
            }
          }
        }
      }
    }
  }
`;
