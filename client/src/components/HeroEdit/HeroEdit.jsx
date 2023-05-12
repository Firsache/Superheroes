// import { useEffect } from "react";
// import { useMessage } from "../../hooks/message.hook";
// import { useHttp } from "../../hooks/http.hook";

import { useState, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";

export const HeroEdit = ({ detailedInfo, toggleEdit }) => {
  const initialState = {
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
  };

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    setForm((prevForm) => ({ ...prevForm, ...detailedInfo }));
  }, [detailedInfo]);

  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const createHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const data = await request("/superheroes", "POST", true, formData);

      message(data.message);
    } catch (error) {}
  };

  return (
    <>
      <form onSubmit={createHandler} encType="multipart/form-data">
        <h1>Create a superhero</h1>
        <div>
          <div className="input-field">
            <input
              id="nickname"
              placeholder="Enter the nickname"
              type="text"
              name="nickname"
            />
            <label htmlFor="nickname">Nickname</label>
          </div>
          <div className="input-field">
            <input
              id="real_name"
              placeholder="Enter the real name"
              type="text"
              name="real_name"
            />
            <label htmlFor="real_name">Real name</label>
          </div>
          <div className="input-field col s12">
            <textarea
              id="origin_description"
              placeholder="Enter the description"
              name="origin_description"
            />
            <label htmlFor="origin_description">Description</label>
          </div>
          <div className="input-field">
            <input
              id="superpowers"
              placeholder="Enter the superpowers"
              type="text"
              name="superpowers"
            />
            <label htmlFor="superpowers">Superpowers</label>
          </div>
          <div className="input-field">
            <input
              id="catch_phrase"
              placeholder="Enter the catch phrase"
              type="text"
              name="catch_phrase"
            />
            <label htmlFor="catch_phrase">Catch phrase</label>
          </div>
          <div className="input-field">
            <input
              id="images"
              type="file"
              name="images"
              multiple
              accept="image/*,.png,.jpg,.gif,.web"
            />
            <label htmlFor="images">Upload one or more images</label>
          </div>
        </div>
        <button type="submit" disabled={loading}>
          Create
        </button>
      </form>
    </>
  );
};
