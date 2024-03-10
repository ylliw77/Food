import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../config"
import Swal from "sweetalert2";

export default function DetailedMenu() {
  const [dish, setDish] = useState({})
  const {id} = useParams()
  const nav = useNavigate()

  async function fetchDishId(){
    try {
      const {data} = await axios.get(`/cuisines/${id}`)
      setDish(data)
    } catch (error) {
      Swal.fire("Data not Found", "???", "warning")
    }
  }
  useEffect(()=> {
    fetchDishId()
  }, [])

  console.log(dish);
  return (
    <>
      <div className="modal-dialog modal-dialog-scrollable">
        <img
          src={dish.imgUrl}
          className="rounded mx-auto d-block"
          style={{
            height: "300px",
            width: "300px",
            margin: "auto",
          }}
        />
      </div> <br />
      <div className="wrapper" style={{
        display : "flex",
        flexDirection : "column"

      }}>
        
      <h5>Name : {dish?.name || ""}</h5>
      <h5>Price : {dish?.price || ""}</h5>
      <h5>Description : {dish?.description || ""} </h5>
      <h5>Category : {dish?.Category?.name || ""}</h5>
      <h5> Author :{dish?.User?.email || ''} </h5>

      </div>
      <button className="btn btn-dark" onClick={() => {nav("/")}}>Back</button>
    </>
  );
}
