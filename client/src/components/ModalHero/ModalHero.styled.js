import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1;
`;

export const Modal = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  max-width: 350px;
  width: 100%;
  min-height: 150px;
  padding: 40px;

  background-color: white;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14),
    0px 2px 1px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  transform: translate(-50%, -50%) scaleY(1);

  span {
    font-size: 16px;
    font-weight: 700;
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;

  border: none;
  color: inherit;
  background-color: transparent;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;

  margin-top: 30px;

  button {
    padding: 5px 14px;
    border: none;
    border-radius: 2px;

    transition: transform ease-in-out;

    :hover {
      transform: scale(1.1);
    }
  }
  .submit {
    background-color: #3cb371;
  }
  .cancel {
    background-color: #f08080;
  }
`;
