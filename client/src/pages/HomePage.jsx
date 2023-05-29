import { routes } from "../helpers/routes";
import { Container, AppTitle, Main, StyledLink } from "./HomePage.styled";

const HomePage = () => {
  return (
    <Container>
      <h1>Welcome to Superheroes app!</h1>
      <Main>
        <p>
          Searched for a place where you can keep and edit your favourite
          heroes? You've found it! Test it yourself, we're sure you'll love our
          app!
        </p>
        <p>
          Follow the links{" "}
          <StyledLink to={routes.NEWHERO}>Create a new hero</StyledLink> and{" "}
          <StyledLink to={routes.HEROES}> Your heroes</StyledLink> and enjoy
          your <AppTitle>Superheroes app</AppTitle>!
        </p>
      </Main>
    </Container>
  );
};

export default HomePage;
