import styled from "styled-components";

export const Wrapper = styled.ul`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  li {
    width: 250px;
    border: 1px solid blue;
    border-radius: 15px;
  }

  img {
    height: 350px;
  }
`;

export const Info = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const ButtonsBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;

  margin-top: 30px;
`;

export const Button = styled.button`
  padding: 10px 32px;
  width: 180px;
  /* max-height: 42px; */

  display: flex;
  align-items: center;

  font-weight: 500;
  font-size: 16px;
  line-height: 1.123;
  text-align: center;

  background-color: lightblue;
  color: blue;
  border-radius: 4px;
  border: 2px solid transparent;
  outline: none;

  transition: border-color 200ms ease-in-out, color 200ms ease-in-out,
    transform 200ms ease-in-out, box-shadow 200ms ease-in-out;

  &:hover,
  &:focus {
    border: 2px solid red;
    color: red;
    transform: translateY(-2px);
    box-shadow: 0 5px 0 red;
  }
`;
