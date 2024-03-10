import { useState } from "react";
import Swal from "sweetalert2";

import Button from "./Button";

export default function Pagination({ fetchDish, component, dishes }) {
  const [page, setPages] = useState(1);
 

  async function setPageIncrement(e) {
    try {
      if(dishes.length !== 10){
       e.preventDefault()
      } else {
        setPages(page + 1);

      }
    } catch (error) {
      Swal.fire("Error paging", "???", "warning")
    }
  }

  async function setPageDecrement() {
    try {
      if (page <= 1) {
        setPages(1);
      } else {
        console.log(page);
        setPages(page - 1);
      }
    } catch (error) {
      Swal.fire("Error paging", "???", "warning")
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    fetchDish("pagination", page);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div onClick={setPageDecrement}>
          <Button component={"Previous"} />
        </div>
        <div onClick={setPageIncrement}>
          <Button component={"Next"} />
        </div>
      </form>
    </>
  );
}
