import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { HeroesList } from "../components/HeroesList/HeroesList";
import { Loader } from "../components/Loader/Loader";
import { routes } from "../helpers/routes";
import { useHttp } from "../hooks/http.hook";

const HeroesPage = () => {
  const { request, loading, error } = useHttp();
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    async function getHeroes() {
      try {
        const res = await request("/superheroes", "GET");

        setHeroes(res.data.result);
      } catch (e) {}
    }
    getHeroes();
  }, [request]);
  return (
    <>
      {error && <div>Try to reload the page</div>}
      {loading && <Loader />}
      {heroes !== null && <HeroesList array={heroes} />}
      {heroes === null && (
        <div>
          You haven't added any heroes yet.{" "}
          <Link to={routes.NEWHERO}>Create a new hero</Link>
        </div>
      )}
    </>
  );
};

export default HeroesPage;
