import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = ({ logoutfunc }) => {
  const logoutContainer = useRef(null);
  const profile = useRef(null);

  useEffect(() => {
    profile.current.addEventListener("click", () => {
      logoutContainer.current.classList.toggle("activated");
    });
  }, []);

  return (
    <Container>
      <div className="logo-container">
        RK Learning <span>Dashboard</span>
      </div>
      <div className="user-container" ref={profile}>
        <div className="user-profilePic">A</div>
        <div className="user-profileName">Administrator</div>
      </div>
      <div className="logout-container" ref={logoutContainer} onClick={() => logoutfunc()}>
        Logout
        <LogoutIcon className="logout-icon" />
      </div>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  z-index: 100;
  width: 100vw;
  height: 70px;
  background-color: var(--bg-clr);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  position: sticky;
  top: 0;

  .logo-container {
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: var(--font-w-4);
    pointer-events: none;

    span {
      font-size: 0.8rem;
      color: var(--txt-clr-gray);
    }
  }

  .user-container {
    display: flex;
    align-items: center;
    column-gap: 10px;
    font-size: 0.9rem;
    padding: 5px 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 8px;
    background-color: var(--bg-clr);

    &:hover {
      background-color: var(--txt-clr);
      color: var(--bg-clr);

      .user-profilePic {
        border-color: var(--bg-clr);
      }
    }

    .user-profilePic {
      width: 30px;
      height: 30px;
      border: 1px solid var(--txt-clr);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .logout-container {
    position: absolute;
    top: 100%;
    right: 40px;
    width: 170px;
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    background-color: var(--bg-clr);
    border-radius: 8px;
    font-size: 0.9rem;
    cursor: pointer;
    transform: translateY(-140%);
    transition: all 0.3s ease;
    z-index: -100;
    /* display: none; */

    &:hover {
      background-color: var(--txt-clr);
      color: var(--bg-clr);
    }

    .logout-icon {
      font-size: 1rem;
    }

    &.activated {
      /* display: flex; */
      transform: translateY(0%);
    }
  }
`;
