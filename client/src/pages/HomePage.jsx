import { Link } from "react-router-dom";
import { routes } from "../helpers/routes";

const HomePage = () => {
  return (
    <>
      <h1>Welcome to Superheroes app!</h1>
      <div>
        <p>
          Searched for a place where you can keep and edit your favourite
          heroes? You've found it! Test it yourself, we're sure you'll love our
          app!
        </p>
        <p>
          Follow the links <Link to={routes.NEWHERO}>Create a new hero</Link>
          and <Link to={routes.HEROES}>Your heroes</Link> and enjoy your
          <span>Superheroes app</span>!
        </p>
      </div>
    </>
  );
};

export default HomePage;
