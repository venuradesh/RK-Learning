import React, { useState } from "react";
import styled from "styled-components";

function Login({ loginfunc, loginInfo }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [wrongInput, setWrongInput] = useState(false);
  const [nullInput, setNullInput] = useState(false);

  const onLoginClick = (e) => {
    e.preventDefault();

    if (userName && password) {
      if (userName === loginInfo.userName && password === loginInfo.password) {
        loginfunc({ userName, password });
      } else {
        setWrongInput(true);
      }
    } else {
      setNullInput(true);
      return;
    }
  };

  return (
    <Container>
      <div className="title">
        RK Learnings <span>Dashboard</span>
      </div>
      <form className="login-form">
        <div className="userName-container input-container">
          <input type="text" name="userName" id="userName" onInput={(e) => setUserName(e.target.value)} required autoComplete="off" />
          <label htmlFor="userName" className="label-container">
            <span className="content-container">User Name</span>
          </label>
        </div>
        <div className="password-container input-container">
          <input type="password" name="password" id="password" onInput={(e) => setPassword(e.target.value)} required autoComplete="off" />
          <label htmlFor="password" className="label-container">
            <span className="content-container">Password</span>
          </label>
        </div>
        {wrongInput ? <div className="wrong-input error">User Name or password incorrect</div> : ""}
        {nullInput ? <div className="null-input error">Insert both user name and password</div> : ""}
        <div className="btn-container">
          <button type="submit" onClick={onLoginClick}>
            Login
          </button>
          <button type="reset">Clear</button>
        </div>
      </form>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 30px;

  .title {
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: var(--font-w-4);
    pointer-events: none;

    span {
      font-size: 0.8rem;
      color: var(--txt-clr-gray);
    }
  }

  .login-form {
    width: 350px;
    height: max-content;
    padding: 25px;
    background-color: var(--bg-clr);
    box-shadow: 0 0 8px 0 var(--bg-clr);
    border-radius: 12px;
    position: relative;
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    .input-container {
      width: 100%;
      height: 50px;
      position: relative;
      z-index: 1;
      overflow: hidden;

      input {
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: none;
        outline: none;
        color: var(--txt-clr);
        font-size: 1rem;
        padding-top: 28px;

        &:focus,
        &:valid {
          & + .label-container {
            &::after {
              border-color: var(--txt-clr);
              right: 0%;
            }

            .content-container {
              font-size: 0.7rem;
              bottom: 60%;
            }
          }
        }
      }

      .label-container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        border-bottom: 1px solid var(--txt-clr-gray);
        pointer-events: none;

        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          border-bottom: 1px solid var(--txt-clr);
          right: 100%;
          bottom: 0;
          transition: all 0.3s ease;
        }

        .content-container {
          font-size: 0.9rem;
          color: var(--txt-clr-gray);
          position: absolute;
          bottom: 0;
          transition: all 0.3s ease;
        }
      }
    }

    .btn-container {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      column-gap: 25px;
      margin-top: 15px;

      button {
        flex: 1;
        background: none;
        border: 1px solid var(--txt-clr-gray);
        color: var(--txt-clr-gray);
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          border-color: var(--txt-clr);
          color: var(--txt-clr);
        }
      }
    }

    .error {
      width: 100%;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 0.8rem;
      color: var(--error-clr);
    }
  }
`;
