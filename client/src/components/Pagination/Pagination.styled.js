import styled from "styled-components";

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;

  button {
    width: 40px;
    height: 40px;
    font-family: inherit;
    font-weight: 600;
    font-size: 16px;
    margin: 0 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: transparent;
    color: red;
    border-color: red;
  }
  .active {
    font-weight: 900;
    border-color: blue;
    background: lightblue;
    color: blue;
  }
`;
