import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { routes } from "../helpers/routes";
import { useHttp } from "../hooks/http.hook";

import { HeroesList } from "../components/HeroesList/HeroesList";
import { Loader } from "../components/Loader/Loader";
import { Pagination } from "../components/Pagination/Pagination";

import { Container } from "./HomePage.styled";

const HeroesPage = () => {
  const { request, loading, error, clearError } = useHttp();
  const [heroes, setHeroes] = useState([]);
  const [totalHeroes, setTotalHeroes] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // const lastHeroIdx = currentPage * herosPerPage;
  // const firstHeroIdx = lastHeroIdx - currentPage;
  // const currentHero = heroes.slice(firstHeroIdx, lastHeroIdx);

  useEffect(() => {
    toast.error(error, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    clearError();
  }, [error, clearError]);

  useEffect(() => {
    async function getHeroes() {
      try {
        const res = await request(`/superheroes?p=${currentPage}`, "GET");

        setHeroes(res.data.result);
        setTotalHeroes(res.data.total);
      } catch (e) {}
    }
    getHeroes();
  }, [currentPage, request]);

  const paginationHandler = (num) => {
    setCurrentPage(num);
  };
  return (
    <>
      {error && <div>Try to reload the page</div>}
      {heroes !== null && (
        <Container>
          <HeroesList array={heroes} />
          <Pagination
            totalHeroes={totalHeroes}
            currentPage={currentPage}
            paginationHandler={paginationHandler}
          />
        </Container>
      )}
      {heroes === null && (
        <div>
          You haven't added any heroes yet.{" "}
          <Link to={routes.NEWHERO}>Create a new hero</Link>
        </div>
      )}
      {loading && <Loader />}
    </>
  );
};

export default HeroesPage;
