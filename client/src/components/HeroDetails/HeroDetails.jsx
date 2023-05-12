import { useState } from "react";
import { ModalHero } from "../ModalHero/ModalHero";

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

  const editHandler = () => {
    toggleModal();
    toggleEdit();
  };
  const deleteHandler = () => {
    toggleModal();
  };
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const toggleEdit = () => {
    setEditing(!editing);
  };

  return (
    <>
      <div>
        <>
          {images.map((image) => {
            return <img alt={nickname} src={image} key={image} />;
          })}
        </>
        <div>
          <h2>{nickname}</h2>
          <p>User Real name: {real_name}</p>
          <h3>The hero description</h3>
          <p>{origin_description}</p>
          <h3>Superpowers</h3>
          <p>{superpowers}</p>
          <h3>Catch phrase</h3>
          <p>{catch_phrase}</p>
        </div>
      </div>
      <div>
        <button onClick={editHandler}>Edit the hero</button>
        <button onClick={deleteHandler}>Delete the hero</button>
      </div>
      {modalOpen && (
        <ModalHero
          detailedInfo={detailedInfo}
          toggleModal={toggleModal}
          editing={editing}
          toggleEdit={toggleEdit}
        />
      )}
    </>
  );
};
