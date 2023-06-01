import { useLocation } from "react-router-dom";
import { routes } from "../../helpers/routes";
import { List, ListItem, StyledLink } from "./HeroesList.styled";
import defaulthero from "../../img/hero.png";

export const HeroesList = ({ array }) => {
  const location = useLocation();

  return (
    <List>
      {array?.map(({ _id, nickname, images }) => {
        const imgSrc = images[0] || defaulthero;
        console.log("HeroesList static image:", imgSrc);
        return (
          <ListItem key={_id}>
            <StyledLink
              state={{ from: location }}
              to={routes.HERO_DETAILS_PATH(_id)}
            >
              <img alt={nickname} src={imgSrc} />
              <h3>{nickname}</h3>
            </StyledLink>
          </ListItem>
        );
      })}
    </List>
  );
};
