import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;

  h1 {
    margin-bottom: 5px;
  }

  input {
    border: 1px solid blue;
    outline: 1px solid transparent;
    border-radius: 4px;
    padding: 8px;
    width: 400px;

    font-size: 14px;

    :active,
    :focus {
      border: 1px solid transparent;
      outline: 1px solid red;
    }

    @media screen and (min-width: 860px) {
      font-size: 16px;
    }
  }
  textarea {
    border: none;
    font-size: 14px;
    width: 400px;
    padding: 8px;

    :active,
    :focus {
      border: none;
      outline: none;
    }
    @media screen and (min-width: 860px) {
      font-size: 16px;
    }
  }
  .input-field {
    display: flex;
    justify-content: space-between;
    align-items: center;

    max-width: 600px;
    margin-bottom: 5px;
  }
`;
export const Wrapper = styled.ul`
  padding: 8px 0;
  width: 100%;
  display: flex;
  gap: 10px;

  img {
    height: 50px;
    padding-bottom: 5px;
  }

  button {
    padding: 3px 6px;
    border: 1px solid red;
    border-radius: 16px;
    transition: background-color ease-in-out, color ease-in-out;
    :hover {
      background-color: lightcoral;
      color: white;
    }
  }
`;
