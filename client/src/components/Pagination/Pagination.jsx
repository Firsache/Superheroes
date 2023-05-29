import { List } from "./Pagination.styled";

export const Pagination = ({ totalHeroes, currentPage, paginationHandler }) => {
  const herosPerPage = 5;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(Number(totalHeroes) / herosPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <List>
        {pageNumbers.map((num) => (
          <li key={num}>
            <button
              className={num === currentPage ? "active" : ""}
              onClick={() => paginationHandler(num)}
            >
              {num}
            </button>
          </li>
        ))}
      </List>
    </div>
  );
};
