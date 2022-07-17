//dependencies
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "../firebase";
import RequestCourse from "./RequestCourse";

//components
import RequestItem from "./RequestItem";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [itemClicked, setItemClicked] = useState(false);
  const [individualItem, setIndividualItem] = useState();
  const collectionRef = firebase.firestore().collection("user");

  useEffect(() => {
    setRequests([]);
    setIndividualItem(false);
    collectionRef.onSnapshot((snap) => {
      snap.docs.map((doc) => {
        if (
          doc.data().course.map((item) => {
            if (item.isBuy === false) {
              setRequests((prev) => [...prev, { id: doc.id, ...doc.data() }]);
            }
          })
        ) {
        }
      });
    });
  }, []);

  return (
    <Container>
      <RequestList>
        <div className="dot-container">
          <div className="big-dot"></div>
        </div>
        {requests.length !== 0 ? (
          <>
            {requests.map((request, key) => (
              <>
                <RequestItem
                  data={request}
                  key={key}
                  onClick={() => {
                    setItemClicked(true);
                    setIndividualItem(request);
                  }}
                />
              </>
            ))}
          </>
        ) : (
          <div className="no-requests">No Requests</div>
        )}
      </RequestList>
      {itemClicked && individualItem ? (
        <div className="request-course">
          <RequestCourse details={individualItem} />
        </div>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Requests;

const Container = styled.div`
  width: calc(100vw - 320px);
  max-width: calc(100vw - 320px);
  height: calc(100vh - 70px);
  position: relative;
  left: 320px;
  padding: 25px 25px;
  z-index: 0;
  display: flex;
  column-gap: 25px;

  .request-course {
    width: calc(100% - 320px - 50px);
    height: calc(100vh - 70px - 50px);
  }
`;

const RequestList = styled.div`
  width: 310px;
  height: 100%;
  background-color: var(--bg-clr);
  position: relative;
  overflow: hidden;
  overflow-y: auto;
  box-shadow: 0 0 8px 0px var(--bg-clr);
  z-index: 1;

  .dot-container {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    z-index: -1;

    .big-dot {
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background-color: var(--bg-dot);
      filter: blur(100px);
      position: absolute;
      bottom: 70%;
      right: 80%;
    }
  }

  .no-requests {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
