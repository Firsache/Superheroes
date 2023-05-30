import { useState, useEffect } from "react";
import { Form, Wrapper } from "./HeroEdit.styled";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { useNavigate } from "react-router-dom";
import { Button } from "../HeroDetails/HeroDetails.styled";
import defaulthero from "../../img/hero.png";
import { routes } from "../../helpers/routes";

export const HeroEdit = ({ detailedInfo, setEdit }) => {
  const { loading, error, request, clearError } = useHttp();
  const message = useMessage();

  const initialState = {
    nickname: detailedInfo.nickname || "",
    real_name: detailedInfo.real_name || "",
    origin_description: detailedInfo.origin_description || "",
    superpowers: detailedInfo.superpowers || "",
    catch_phrase: detailedInfo.catch_phrase || "",
  };
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);
  const [files, setFiles] = useState([]);
  const [imageData, setImageData] = useState(detailedInfo.images || []);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const changeImagesHandler = (e) => {
    setFiles([e.target.files]);
  };
  const deleteImageHandler = (image) => {
    const newArr = imageData.filter((el) => el !== image);
    setImageData(newArr);
  };
  const createHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      for (const image of imageData) {
        formData.append("old_images", image);
      }
      for (const file of files) {
        formData.append("images", file);
      }

      const data = await request(
        `/superheroes/${detailedInfo._id}`,
        "PUT",
        true,
        formData
      );

      message(data.message);
      setEdit(false);
      navigate(`/${routes.HEROES}`);
    } catch (error) {}
  };

  return (
    <>
      <Form onSubmit={createHandler} encType="multipart/form-data">
        <h1>Edit the superhero</h1>
        <div>
          <div className="input-field">
            <label htmlFor="nickname">Nickname</label>
            <input
              id="nickname"
              placeholder="Enter the nickname"
              type="text"
              name="nickname"
              value={form.nickname}
              onChange={changeHandler}
            />
          </div>
          <div className="input-field">
            <label htmlFor="real_name">Real name</label>
            <input
              id="real_name"
              placeholder="Enter the real name"
              type="text"
              name="real_name"
              value={form.real_name}
              onChange={changeHandler}
            />
          </div>
          <div className="input-field col s12">
            <label htmlFor="origin_description">Description</label>
            <textarea
              id="origin_description"
              placeholder="Enter the description"
              name="origin_description"
              value={form.origin_description}
              onChange={changeHandler}
            />
          </div>
          <div className="input-field">
            <label htmlFor="superpowers">Superpowers</label>
            <input
              id="superpowers"
              placeholder="Enter the superpowers"
              type="text"
              name="superpowers"
              value={form.superpowers}
              onChange={changeHandler}
            />
          </div>
          <div className="input-field">
            <label htmlFor="catch_phrase">Catch phrase</label>
            <input
              id="catch_phrase"
              placeholder="Enter the catch phrase"
              type="text"
              name="catch_phrase"
              value={form.catch_phrase}
              onChange={changeHandler}
            />
          </div>
          {imageData && (
            <Wrapper>
              {imageData.map((image) => {
                const imgSrc = image || defaulthero;
                return (
                  <li key={image}>
                    <img alt={form.nickname} src={imgSrc} height={50} />
                    <button
                      type="button"
                      onClick={() => deleteImageHandler(image)}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </Wrapper>
          )}
          <div className="input-field">
            <label htmlFor="images">Upload new images</label>
            <input
              id="images"
              type="file"
              name="images"
              multiple
              accept="image/*,.png,.jpg,.gif,.web"
              onChange={changeImagesHandler}
            />
          </div>
        </div>
        <Button type="submit" disabled={loading}>
          Create
        </Button>
      </Form>
    </>
  );
};
