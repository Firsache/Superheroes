import { Link, useLocation } from "react-router-dom";
import { routes } from "../../helpers/routes";

export const HeroesList = ({ array }) => {
  const location = useLocation();

  return (
    <ul>
      {array?.map(({ _id, nickname, images }) => {
        return (
          <li key={_id}>
            <Link state={{ from: location }} to={routes.HERO_DETAILS_PATH(_id)}>
              <img alt={nickname} src={images[0]} height={150} />
              <h3>{nickname}</h3>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
