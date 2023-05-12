import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

import { BsX } from "react-icons/bs";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { Backdrop, CloseBtn, Modal, ModalButtons } from "./ModalHero.styled";
import { routes } from "../../helpers/routes";
import { HeroEdit } from "../HeroEdit/HeroEdit";

const modalRoot = document.querySelector("#modal-root");

export const ModalHero = ({
  detailedInfo,
  toggleModal,
  editing,
  toggleEdit,
}) => {
  const navigate = useNavigate();
  const { request } = useHttp();
  const message = useMessage();

  useEffect(() => {
    function handleEscapeClick(e) {
      if (e.code === "Escape") {
        toggleModal();
      }
    }
    window.addEventListener("keydown", handleEscapeClick);
    return () => {
      window.removeEventListener("keydown", handleEscapeClick);
    };
  }, [toggleModal]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  const handleEscapeClick = (e) => {
    if (e.code === "Escape") {
      toggleModal();
    }
  };
  const deleteHero = () => {
    async function deleteHero() {
      try {
        const { data } = await request(
          `/superheroes/${detailedInfo._id}`,
          "DELETE"
        );
        message(data.message);
        toggleModal();
        navigate(`/${routes.HEROES}`);
      } catch (e) {}
    }
    deleteHero();
  };

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <Modal onKeyDown={handleEscapeClick}>
        <div>Modal is here</div>
        {!editing && (
          <>
            <div>
              You are going to delete the superhero{" "}
              <span>{detailedInfo.nickname}...</span>
            </div>
            <ModalButtons>
              <button className="submit" onClick={deleteHero}>
                Submit
              </button>
              <button className="cancel" onClick={() => toggleModal()}>
                Cancel
              </button>
            </ModalButtons>
          </>
        )}
        {editing && (
          <HeroEdit detailedInfo={detailedInfo} toggleEdit={toggleEdit} />
        )}

        <CloseBtn onClick={() => toggleModal()}>
          <BsX size={25} />
        </CloseBtn>
      </Modal>
    </Backdrop>,
    modalRoot
  );
};
