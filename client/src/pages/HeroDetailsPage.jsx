import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

import { useHttp } from "../hooks/http.hook";
import { routes } from "../helpers/routes";

import { HeroInfo } from "../components/HeroDetails/HeroDetails";
import { Loader } from "../components/Loader/Loader";
import { Container } from "./HomePage.styled";

const HeroDetailsPage = () => {
  const location = useLocation();

  const { request, loading, error } = useHttp();
  const [detailedInfo, setDetailedInfo] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id === null) return;

    async function getDetailedInfo() {
      try {
        const { data } = await request(`/superheroes/${id}`, "GET", null, null);
        setDetailedInfo(data.result);
      } catch (error) {}
    }

    getDetailedInfo();
  }, [id, request]);

  return (
    <>
      {error && <div>Try to reload the page</div>}
      {loading && <Loader />}
      <Container>
        <BsArrowLeft size={20} />{" "}
        <Link to={location.state?.from ?? routes.HOME}>Go back</Link>
        {detailedInfo && <HeroInfo detailedInfo={detailedInfo} />}
      </Container>
    </>
  );
};

export default HeroDetailsPage;
