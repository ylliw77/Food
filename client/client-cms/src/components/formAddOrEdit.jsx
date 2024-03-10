import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../config";
import Swal from "sweetalert2";

const Form = ({ page }) => {
  const { id } = useParams();
  const nav = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    categoryId: "",
  });

  async function getDishById() {
    try {
      setLoading(true);
      const { data } = await axios({
        method: "GET",
        url: "/cuisines/" + id,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      setUserInput({
        name: data.name,
        description: data.description,
        price: data.price,
        imgUrl: data.imgUrl,
        categoryId: data.categoryId,
      });
    } catch (error) {
      Swal.fire(`Data not Found`, "???", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (page === "edit") {
      getDishById();
    } else if (page === "add") {
      setUserInput({
        name: "",
        description: "",
        price: "",
        imgUrl: "",
        categoryId: "",
      });
    }
  }, [page]);

  async function handleSubmit(e) {
    e.preventDefault();

    let config = {
      url: "cuisines/",
      data: userInput,
      headers: {
        Authorization: "Bearer " + localStorage.access_token,
      },
    };
    try {
      if (page === "add") {
        config.method = "POST";
      } else {
        config.method = "PUT";
        config.url += `${id}`;
      }
      const { data } = await axios(config);
      nav("/dash");
    } catch (error) {
      Swal.fire(`Error`, "???", "error");
    }
  }

  if (loading) {
    return <h1>Please wait..</h1>;
  }

  function handleOnChange(e) {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={userInput.name}
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={userInput.description}
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={userInput.price}
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image Url</label>
          <input
            type="text"
            className="form-control"
            name="imgUrl"
            value={userInput.imgUrl}
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">CategoryId</label>
          <input
            type="number"
            className="form-control"
            name="categoryId"
            value={userInput.categoryId}
            onChange={handleOnChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {page}
        </button>
      </form>
    </>
  );
};

export default Form;
