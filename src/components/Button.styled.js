import styled from "styled-components";

export const Button = styled.button`
  border: 2px solid #000000;
  box-sizing: border-box;
  border-radius: 23px;
  width: 100%;
  padding-left: 20%;
  padding-right: 20%;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    trasnform: scale(0.8);
  }
  background-image: linear-gradient(to right, var(--pinkred), var(--pink));
`;

export const ButtonSignInUp = styled.button`
  font-size: 20px;
  border: 2px solid #000000;
  box-sizing: border-box;
  border-radius: 23px;
  width: 100%;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    trasnform: scale(0.8);
  }
  background-image: linear-gradient(to right, var(--pinkred), var(--pink));
`;

export const ButtonProfile = styled.button`
  border: 2px solid #000000;
  box-sizing: border-box;
  border-radius: 23px;
  width: 50%;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    trasnform: scale(0.8);
  }
  color: var(--white);
  margin-bottom: 30px;
  align-self: center;
  font-weight: 500;
  font-size: 20px;
  background-color: var(--dark_purple);
`;

export const ButtonPopUp = styled.button`
  border: 2px solid #000000;
  box-sizing: border-box;
  border-radius: 23px;
  width: 20%;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    trasnform: scale(0.8);
  }
  color: var(--white);
  font-weight: 500;
  font-size: 20px;
  float: right;
  background-color: var(--dark_purple);
`;

export const BackButton = styled.button`
  width: 8%;
  text-decoration: none;
  font-family: sans-serif;
  background-color: var(--pinkred);
  border-radius: 100px;
  border: 2px solid #000000;
  margin-left: 4%;
  margin-top: 4%;
  float: left;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    trasnform: scale(0.8);
  }
`;
