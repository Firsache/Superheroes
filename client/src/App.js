import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./helpers/routes";

import { Layout } from "./components/Layout/Layout";
import { Loader } from "./components/Loader/Loader";

const HomePage = lazy(() => import("./pages/HomePage"));
const HeroesPage = lazy(() => import("./pages/HeroesPage"));
const NewHeroPage = lazy(() => import("./pages/NewHeroPage"));
const HeroDetailsPage = lazy(() => import("./pages/HeroDetailsPage"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={routes.HOME} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={routes.NEWHERO} element={<NewHeroPage />} />
          <Route path={routes.HEROES} element={<HeroesPage />} />
          <Route path={routes.HERO_DETAILS} element={<HeroDetailsPage />} />
        </Route>
        <Route path="*" element={<Navigate to={routes.HOME} />} />
      </Routes>
    </Suspense>
  );
}

export default App;
