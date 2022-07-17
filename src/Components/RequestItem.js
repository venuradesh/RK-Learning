import React from "react";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";

const RequestItem = ({ data, onClick }) => {
  return (
    <Container onClick={onClick}>
      <div className="profilePic">
        <PersonIcon className="personIcon" />
      </div>
      <div className="id-wrapper">{data.id}</div>
    </Container>
  );
};

export default RequestItem;

const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  border-bottom: 1px solid var(--border-clr);
  column-gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-bottom: 1px solid var(--txt-clr);

    .profilePic {
      color: var(--txt-clr);
      border: 1px solid var(--txt-clr);

      .personIcon {
        color: var(--txt-clr);
      }
    }

    .id-wrapper {
      color: var(--txt-clr);
    }
  }

  .profilePic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--txt-clr-gray);
    transition: all 0.3s ease;

    .personIcon {
      color: var(--txt-clr-gray);
      transition: all 0.3s ease;
    }
  }

  .id-wrapper {
    font-size: 0.8rem;
    color: var(--txt-clr-gray);
    transition: all 0.3s ease;
  }
`;
