import { Link } from "react-router-dom";
import styled from "styled-components";

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const ListItem = styled.li`
  width: 300px;
  border: 2px solid blue;
  border-radius: 15px;

  img {
    height: 350px;
  }
`;
export const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 0;
`;
