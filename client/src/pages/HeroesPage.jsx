import { useEffect, useState } from "react";

import { HeroesList } from "../components/HeroesList/HeroesList";
import { Loader } from "../components/Loader/Loader";
import { useHttp } from "../hooks/http.hook";

const HeroesPage = () => {
  const { request, loading, error } = useHttp();
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    async function getHeroes() {
      try {
        const data = await request("/superheroes", "GET", null, null);
        console.log(data);
        setHeroes(data.result);
      } catch (error) {}
    }
    getHeroes();
  }, [request]);
  return (
    <>
      {error && <div>Try to reload the page</div>}
      {loading && <Loader />}
      {Boolean(heroes.length) && <HeroesList array={heroes} />}
    </>
  );
};

export default HeroesPage;
