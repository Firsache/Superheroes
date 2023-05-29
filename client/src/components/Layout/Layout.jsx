import { Outlet } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { routes } from "../../helpers/routes";
import { HeaderBlock, Navigation } from "./Layout.styled";

export const Layout = () => {
  //   const isDesktop = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      <HeaderBlock>
        <Link to={routes.HOME}>Superheroes App</Link>
        <Navigation>
          <NavLink to={routes.NEWHERO}>A new hero</NavLink>
          <NavLink to={routes.HEROES}>Heroes</NavLink>
        </Navigation>
      </HeaderBlock>
      <Outlet />
    </>
  );
};
