export const HeroInfo = ({ detailedInfo }) => {
  const {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images,
  } = detailedInfo;

  return (
    <>
      <div>
        <>
          {images.map((image) => (
            <img src={image} alt={nickname} />
          ))}
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
        <button>Edit the hero</button>
        <button>Delete the hero</button>
      </div>
    </>
  );
};
