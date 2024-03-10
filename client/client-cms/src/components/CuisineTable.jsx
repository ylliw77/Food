import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "../config";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const CuisineTable = ({ dishes, fetchDish }) => {
  const nav = useNavigate();

  async function deleteDish(id) {
    try {
      const { data } = await axios({
        method: "DELETE",
        url: `/cuisines/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      fetchDish();
    } catch (error) {
      Swal.fire(`Data not found`, "???", "error")
    }
  }

  async function toEdit(editId) {
    nav("/edit/" + editId);
  }
  async function toUpload(uploadId) {
    nav("/upload/" + uploadId);
  }

  async function toAddCuisine() {
    nav("/add-cuisine");
  }

  return (
    <>
      <div onClick={toAddCuisine}>
        <Button name={"Add"} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Price</th>
            <th>Author</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => (
            <tr key={dish.id}>
              <td>{dish?.name || ""}</td>
              <td>{dish?.description || ""}</td>
              <td>{dish?.imgUrl || ""}</td>
              <td>{dish?.price || ""}</td>
              <td>{dish?.User?.email || ""}</td>
              <td>{dish?.Category?.name || ""}</td>
              <td>
                <button
                  className="btn btn-dark btn-sm"
                  onClick={() => {
                    toEdit(dish.id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                  </svg>
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    toUpload(dish.id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-file-earmark-arrow-up"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707z" />
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                  </svg>
                </button>
                <button
                  type="submit"
                  onClick={() => deleteDish(dish.id)}
                  className="btn btn-danger btn-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CuisineTable;
