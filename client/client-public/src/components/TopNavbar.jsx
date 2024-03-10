import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Navbar({ fetchDish, category }) {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");

  async function searchBar(event) {
    setSearch(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    fetchDish("search", search);
  }

  async function handleCategory(e) {
    // console.log(e.target.value)
    setCategoryId(e.target.value);
  }
  async function handleChange(e) {
    e.preventDefault();
    fetchDish("category", categoryId);
  }

  return (
    <>
      <nav className="navbar navbar-light bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">
            <i className="bi bi-escape"></i>HACTIV FOODIES
          </a>

<div>
          <select onChange={handleCategory}>
            {category.map((el) => {
              return (
                <option key={el.id} value={el.id}>
                  {el?.name || ""}
                </option>
              );
            })}
          </select>
          <button className="btn btn-warning" onClick={handleChange}>
            {" "}
            Go Filter{" "}
          </button>

</div>

          <form onSubmit={handleSubmit} className="d-flex input-group w-auto">
            <input
              value={search}
              onChange={searchBar}
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <span className="input-group-text border-0" id="search-addon">
              <i className="fas fa-search"></i>
            </span>
          </form>
        </div>
      </nav>
    </>
  );
}
