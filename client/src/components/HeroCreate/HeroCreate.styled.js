import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 30px;

  input {
    border: none;
    width: 400px;
    padding: 10px 10px 20px 10px;

    font-size: 16px;

    :active,
    :focus {
      border: none;
      outline: none;
    }

    @media screen and (min-width: 860px) {
      font-size: 18px;
    }
  }
  textarea {
    border: none;
    font-size: 14px;
    width: 400px;
    padding: 10px 10px 20px 10px;
    padding-bottom: 20px;

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

    width: 750px;
    margin-bottom: 15px;
  }
`;
