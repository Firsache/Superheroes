export const routes = {
  HOME: "/",
  NEWHERO: "newhero",
  HEROES: "superheroes",
  HERO_DETAILS: "superheroes/:id",
  HERO_DETAILS_PATH: (_id) => "/superheroes/" + _id,
};
