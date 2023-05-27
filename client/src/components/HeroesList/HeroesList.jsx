import { Link, useLocation } from "react-router-dom";
import { routes } from "../../helpers/routes";

export const HeroesList = ({ array }) => {
  const location = useLocation();

  return (
    <ul>
      {array?.map(({ id, nickname, images }) => (
        <li key={id}>
          <Link state={{ from: location }} to={routes.HERO_DETAILS_PATH(id)}>
            <img alt={nickname} src={images[0]} />;<h3>{nickname}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};
