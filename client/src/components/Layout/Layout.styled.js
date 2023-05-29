import styled from "styled-components";

export const HeaderBlock = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  padding: 10px 40px;
  color: blue;
  background-color: lightblue;
  font-size: 22px;
`;

export const Navigation = styled.nav`
  display: flex;
  gap: 15px;

  font-size: 18px;

  a {
    padding: 10px 0;
  }

  .active {
    padding: 10px 0;
    border-bottom: 2px solid red;
  }
`;
