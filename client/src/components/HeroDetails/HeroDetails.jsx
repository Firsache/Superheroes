import { useState } from "react";
import { ModalHero } from "../ModalHero/ModalHero";
import { Button, ButtonsBlock, Info, Wrapper } from "./HeroDetails.styled";
import defaulthero from "../../img/hero.png";

export const HeroInfo = ({ detailedInfo }) => {
  const {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images,
  } = detailedInfo;

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const editHandler = () => {
    toggleModal();
    setEdit(true);
  };
  const deleteHandler = () => {
    toggleModal();
    setDelete(true);
  };
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const setEdit = (value) => {
    setEditing(value);
  };
  const setDelete = (value) => {
    setDeleting(value);
  };

  return (
    <>
      <>
        <Wrapper>
          {images.map((image) => {
            const imgSrc = image || defaulthero;
            console.log("HeroInfo static image:", imgSrc);
            return (
              <li key={image}>
                <img alt={nickname} src={imgSrc} />
              </li>
            );
          })}
        </Wrapper>
        <Info>
          <h2>{nickname}</h2>
          <p>Real name: {real_name}</p>
          <h3>The hero description</h3>
          <p>{origin_description}</p>
          <h3>Superpowers</h3>
          <p>{superpowers}</p>
          <h3>Catch phrase</h3>
          <p>{catch_phrase}</p>
        </Info>
      </>
      <ButtonsBlock>
        <Button onClick={editHandler}>Edit the hero</Button>
        <Button onClick={deleteHandler}>Delete the hero</Button>
      </ButtonsBlock>
      {modalOpen && (
        <ModalHero
          detailedInfo={detailedInfo}
          toggleModal={toggleModal}
          editing={editing}
          setEdit={setEdit}
          deleting={deleting}
          setDelete={setDelete}
        />
      )}
    </>
  );
};
