import { Outlet } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { routes } from "../../helpers/routes";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer />
      <Outlet />
    </>
  );
};
