import CardMenu from "../components/Card";
import Navbar from "../components/TopNavbar";
import Pagination from "../components/Pagination";
import axios from "../config";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Homepage({ component }) {
  const [dishes, setDish] = useState([]);
  const [category, setCategory] = useState([]);

  let extUrl = "/cuisines";
  let categoriesUrl = "/categories";

  async function fetchCategories() {
    try {
      const { data } = await axios.get(categoriesUrl);
      setCategory(data);
    } catch (error) {
      Swal.fire("Error fetch data", "???", "warning")
    }
  }

  async function fetchDish(action, filter) {
    try {
      if (action) {
        if (action === "pagination") {
          extUrl += `?page=${filter}`;
        } else if (action === "search") {
          extUrl += `?search=${filter}`;
        } else if (action === "category") {
          extUrl += `?category=${filter}`;
        }
      }

      
      const { data } = await axios.get(extUrl);
      setDish(data);
    } catch (error) {
      Swal.fire("Error fetch data", "???", "warning")
    }
  }

  useEffect(() => {
    fetchDish();
    fetchCategories();
  }, []);

  return (
    <>
        <Navbar fetchDish={fetchDish} category={category} />
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 g-3">
          {dishes.map((dish) => {
            return <CardMenu component={component} key={dish.id} dish={dish} />;
          })}
        </div>
     
      </div>
        <div style={{ position: "absolute", bottom: 0, right: 0 }}>
          <Pagination fetchDish={fetchDish} component={component} dishes={dishes} />
        </div>
    </>
  );
}
