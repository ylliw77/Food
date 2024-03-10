import { useEffect, useState } from "react";
import CuisineTable from "../components/CuisineTable";
import axios from "../config";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [dishes, setDishes] = useState([]);
  const fetchDish = async () => {
    try {
      const { data } = await axios({
        method : "GET",
        data : dishes,
        url : "/cuisines",
        headers : {
          Authorization : "Bearer " + localStorage.getItem("access_token")
        }
      })
      setDishes(data);
    } catch (error) {
      Swal.fire(`Error fetch data`, "???", "error")
    }
  };
  useEffect(() => {
    fetchDish();
  }, []);
  return (
    <>
      <CuisineTable dishes={dishes} fetchDish={fetchDish}/>
    </>
  );
};

export default Dashboard;
