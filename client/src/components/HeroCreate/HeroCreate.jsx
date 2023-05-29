import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useMessage } from "../../hooks/message.hook";
import { useHttp } from "../../hooks/http.hook";
import { routes } from "../../helpers/routes";
import { Form } from "./HeroCreate.styled";
import { Button } from "../HeroDetails/HeroDetails.styled";

export const HeroCreate = () => {
  const navigate = useNavigate();
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
      navigate(`/${routes.HEROES}`);
    } catch (error) {}
  };

  return (
    <>
      <Form onSubmit={createHandler} encType="multipart/form-data">
        <h1>Create a superhero</h1>
        <div>
          <div className="input-field">
            <label htmlFor="nickname">Nickname</label>
            <input
              id="nickname"
              placeholder="Enter the nickname"
              type="text"
              name="nickname"
            />
          </div>
          <div className="input-field">
            <label htmlFor="real_name">Real name</label>
            <input
              id="real_name"
              placeholder="Enter the real name"
              type="text"
              name="real_name"
            />
          </div>
          <div className="input-field col s12">
            <label htmlFor="origin_description">Description</label>
            <textarea
              id="origin_description"
              placeholder="Enter the description"
              name="origin_description"
            />
          </div>
          <div className="input-field">
            <label htmlFor="superpowers">Superpowers</label>
            <input
              id="superpowers"
              placeholder="Enter the superpowers"
              type="text"
              name="superpowers"
            />
          </div>
          <div className="input-field">
            <label htmlFor="catch_phrase">Catch phrase</label>
            <input
              id="catch_phrase"
              placeholder="Enter the catch phrase"
              type="text"
              name="catch_phrase"
            />
          </div>
          <div className="input-field">
            <label htmlFor="images">Upload one or more images</label>
            <input
              id="images"
              type="file"
              name="images"
              multiple
              accept="image/*,.png,.jpg,.gif,.web"
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
