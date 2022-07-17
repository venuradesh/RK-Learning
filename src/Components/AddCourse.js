//dependencies
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

//components and config files
import firebase, { storage } from "../firebase";

const AddCourse = () => {
  const navigate = useNavigate();
  const [noOfVideos, setNoOfVideos] = useState(0);
  const [videos, setVideos] = useState([]);
  const [imageUpload, setImageUpload] = useState();
  const [submitClicked, setSubmitClicked] = useState(false);

  //firebase refernece to the collection
  const collectionRef = firebase.firestore().collection("course");

  const onFileInputClick = () => {
    document.getElementById("file-input").click();
  };

  const uploadImage = async (videoAvailability) => {
    if (imageUpload) {
      const fileName = `${Date.now()}_${imageUpload.name}`;
      const imageRef = ref(storage, `course/${fileName}`); //(storage ref, file name)
      const uploadFile = uploadBytes(imageRef, imageUpload, { contentType: "image/jpeg" });
      await uploadFile
        .then(() => {
          getDownloadURL(ref(storage, `course/${fileName}`)).then((url) => {
            collectionRef
              .doc()
              .set({
                image: `${url}`,
                name: document.getElementById("courseName").value,
                price: document.getElementById("coursePrice").value,
                playlist: videoAvailability ? videos : [],
              })
              .then(() => {
                navigate("/");
              });
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const onVideoPlayListSubmit = () => {
    for (let i = 0; i < noOfVideos; i++) {
      setVideos((prev) => [
        ...prev,
        {
          title: document.getElementById(`video${i}Title`).value,
          link: document.getElementById(`video${i}Link`).value,
          time: document.getElementById(`video${i}Time`).value,
        },
      ]);
    }
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    setSubmitClicked(true);
    onVideoPlayListSubmit();
  };

  useEffect(() => {
    if (submitClicked && videos.length !== 0) {
      uploadImage(true);
    } else if (submitClicked && videos.length === 0) {
      uploadImage(false);
    }
  }, [submitClicked, videos]);

  return (
    <Container>
      <form className="form-container">
        <div className="title">Add a new course</div>
        <div className="input-container courseName">
          <input type="text" name="courseName" id="courseName" required autoComplete="off" />
          <label htmlFor="courseName" className="label-container">
            <span className="content-container">Course Name</span>
          </label>
        </div>
        <div className="input-container coursePrice">
          <input type="text" name="courseName" id="coursePrice" required autoComplete="off" />
          <label htmlFor="coursePrice" className="label-container">
            <span className="content-container">Price (Rs.)</span>
          </label>
        </div>
        <div className="noOfVideos input-container">
          <input type="number" name="noOfPlaylists" id="noOfPlaylists" required autoComplete="off" onChange={() => setVideos([])} />
          <label htmlFor="noOfPlaylists" className="label-container noOfPlaylists">
            <span className="content-container">No of Videos for the Playlist</span>
          </label>
          <ArrowCircleRightIcon
            className="next-icon"
            onClick={() => {
              setNoOfVideos(document.getElementById("noOfPlaylists").value);
            }}
          />
        </div>
        {noOfVideos ? (
          <div className="video-section">
            {[...Array(parseInt(noOfVideos))].map((_, index) => (
              <span key={index}>
                <div className="playlist-contintainer">
                  <div className="input-container">
                    <input type="text" name="videoName" id={`video${index}Title`} required autoComplete="off" />
                    <label className="label-container">
                      <span className="content-container">Title</span>
                    </label>
                  </div>
                </div>
                <div className="playlist-contintainer">
                  <div className="input-container">
                    <input type="text" name="videolink" id={`video${index}Link`} required autoComplete="off" />
                    <label className="label-container">
                      <span className="content-container">Link</span>
                    </label>
                  </div>
                </div>
                <div className="playlist-contintainer">
                  <div className="input-container">
                    <input type="text" name="videoTime" id={`video${index}Time`} required autoComplete="off" />
                    <label className="label-container">
                      <span className="content-container">Time</span>
                    </label>
                  </div>
                </div>
              </span>
            ))}
          </div>
        ) : (
          ""
        )}

        <div className="add-image">
          <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} name="file-input" id="file-input" />
          <div className="image-container" onClick={() => onFileInputClick()}>
            <label htmlFor="file-input" id="file-label">
              Attach a thumbnail
            </label>
            <AddPhotoAlternateIcon className="add-photo" />
            <span id="done-label">
              Done <CheckCircleIcon />
            </span>
          </div>
        </div>
        <div className="btn-container">
          <button type="submit" onClick={(e) => onSubmitClick(e)}>
            Submit
          </button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </Container>
  );
};

export default AddCourse;

const Container = styled.div`
  width: calc(100vw - 320px);
  max-width: calc(100vw - 320px);
  height: calc(100vh - 70px);
  position: relative;
  left: 320px;
  padding: 25px 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  .form-container {
    width: 500px;
    height: max-content;
    padding: 20px 40px;
    border-radius: 12px;
    background-color: var(--bg-clr);
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 1.5rem;
      text-transform: uppercase;
      font-weight: var(--font-w-4);
      margin-top: 10px;
      margin-bottom: 40px;
    }

    .input-container {
      width: 100%;
      height: 50px;
      margin-bottom: 10px;
      position: relative;
      display: flex;
      align-items: center;
      overflow: hidden;
      column-gap: 20px;

      input {
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: none;
        font-size: 1rem;
        color: var(--txt-clr);
        outline: none;
        padding-top: 24px;

        &#noOfPlaylists {
          width: 50%;
        }

        &:focus,
        &:valid {
          & + .label-container {
            &::after {
              right: 0;
            }
          }

          & + .label-container .content-container {
            font-size: 0.7rem;
            bottom: 60%;
            color: var(--txt-clr-gray);
          }
        }
      }

      input[type="number"] {
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          appearance: none;
          margin: 0;
        }
      }

      .label-container {
        position: absolute;
        width: 100%;
        height: 100%;
        border-bottom: 1px solid var(--border-clr);
        top: 0;
        left: 0;
        pointer-events: none;
        display: flex;

        &.noOfPlaylists {
          width: 50%;
        }

        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          border-bottom: 2px solid var(--txt-clr-gray);
          right: 100%;
          bottom: 0;
          transition: all 0.3s ease;
        }

        .content-container {
          position: absolute;
          bottom: 0;
          color: var(--border-clr);
          transition: all 0.3s ease;
        }
      }

      .next-icon {
        color: var(--border-clr);
        cursor: pointer;
        font-size: 2rem;
        position: absolute;
        bottom: 0;
        right: 40%;
        transition: all 0.3s ease;

        &:hover {
          color: var(--txt-clr-gray);
        }
      }
    }

    .video-section {
      width: 100%;
      max-height: 200px;
      overflow-y: auto;

      span {
        display: flex;
        align-items: center;
        column-gap: 10px;
      }

      .playlist-container {
        flex: 1;
      }
    }

    .add-image {
      width: 100%;
      height: 50px;
      border: 1px solid var(--border-clr);
      margin-top: 20px;

      #file-input {
        display: none;
      }

      .image-container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 10px;
        font-size: 0.8rem;
        color: var(--border-clr);
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          border: 1px solid var(--txt-clr-gray);
          color: var(--txt-clr-gray);
        }

        label {
          pointer-events: none;
        }

        #done-label {
          display: none;
        }

        .add-photo {
          font-size: 1.3rem;
        }
      }
    }

    .btn-container {
      margin-top: 20px;
      width: 100%;
      height: 50px;
      display: flex;
      column-gap: 10px;
      margin-bottom: 30px;

      button {
        flex: 1;
        background-color: transparent;
        color: var(--border-clr);
        border: 1px solid var(--border-clr);
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          border: 1px solid var(--txt-clr-gray);
          color: var(--txt-clr-gray);
        }
      }
    }
  }
`;
