import { useEffect, useState } from "react";
import { getAllHeroes } from "../services/api";

import { HeroesList } from "../components/HeroesList/HeroesList";
import { Loader } from "../components/Loader/Loader";

const HeroesPage = () => {
  const [heroes, setHeroes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getHeroes() {
      try {
        setIsLoading(true);

        const { data } = await getAllHeroes();
        console.log(data);

        setHeroes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getHeroes();
  }, []);
  return (
    <>
      {error && <div>Try to reload the page</div>}
      {isLoading && <Loader />}
      {Boolean(heroes.length) && <HeroesList array={heroes} />}
    </>
  );
};

export default HeroesPage;
