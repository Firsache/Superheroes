import { Outlet } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { routes } from "../../helpers/routes";

export const Layout = () => {
  //   const isDesktop = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      <header>
        <Link to={routes.HOME}>Superheroes App</Link>
        <nav>
          <NavLink to={routes.NEWHERO}>A new hero</NavLink>
          <NavLink to={routes.HEROES}>Heroes</NavLink>
        </nav>
      </header>
      <Outlet />
    </>
  );
};
