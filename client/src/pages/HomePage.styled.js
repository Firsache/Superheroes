import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  margin: 20px;
  padding: 15px 30px;
`;

export const Main = styled.div`
  margin: 20px 0px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  font-size: 20px;
  line-height: 1.5;
`;
export const StyledLink = styled(Link)`
  font-size: 24px;
  color: blue;
  text-shadow: 1px 1px 1px lightblue;
`;

export const AppTitle = styled.span`
  font-size: 26px;
  font-weight: 600;
  text-shadow: 1px 1px 1px red;
`;
