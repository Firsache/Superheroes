import { HeroCreate } from "../components/HeroCreate/HeroCreate";
import { Container } from "./HomePage.styled";

const NewHeroPage = () => {
  return (
    <Container>
      <HeroCreate />
    </Container>
  );
};

export default NewHeroPage;
