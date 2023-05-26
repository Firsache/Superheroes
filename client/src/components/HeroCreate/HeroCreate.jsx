import { useEffect, useState } from "react";
import { useMessage } from "../../hooks/message.hook";
import { useHttp } from "../hooks/http.hook";

export const HeroCreate = () => {
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();

  const [form, setForm] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
    images: [],
  });

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createHandler = async () => {
    try {
      const data = await request("/superheroes/newhero", "POST", { ...form });
      message(data.message);
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Create a superhero</h1>
        <div className="card teal lighten-2">
          <div className="card-content white-text">
            <span className="card-title">The superhero description</span>
            <div>
              <div className="input-field">
                <input
                  id="nickname"
                  placeholder="Enter the nickname"
                  type="text"
                  name="nickname"
                  value={form.nickname}
                  onChange={changeHandler}
                />
                <label htmlFor="nickname">Nickname</label>
              </div>
              <div className="input-field">
                <input
                  id="real_name"
                  placeholder="Enter the real name"
                  type="text"
                  name="real_name"
                  value={form.real_name}
                  onChange={changeHandler}
                />
                <label htmlFor="real_name">Real name</label>
              </div>
              <div className="input-field col s12">
                <textarea
                  id="origin_description"
                  placeholder="Enter the description"
                  name="origin_description"
                  value={form.origin_description}
                  onChange={changeHandler}
                />
                <label htmlFor="origin_description">Description</label>
              </div>
              <div className="input-field">
                <input
                  id="superpowers"
                  placeholder="Enter the superpowers"
                  type="text"
                  name="superpowers"
                  value={form.superpowers}
                  onChange={changeHandler}
                />
                <label htmlFor="superpowers">Superpowers</label>
              </div>
              <div className="input-field">
                <input
                  id="catch_phrase"
                  placeholder="Enter the catch phrase"
                  type="text"
                  name="catch_phrase"
                  value={form.catch_phrase}
                  onChange={changeHandler}
                />
                <label htmlFor="catch_phrase">Catch phrase</label>
              </div>
              <div className="file-field input-field">
                <div className="btn">
                  <span>File</span>
                  <input id="images" type="file" multiple />
                  <label htmlFor="images">Upload one or more images</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-action">
          <button
            className="btn teal darken-2"
            style={{ marginRight: 15 }}
            onClick={createHandler}
            disabled={loading}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
