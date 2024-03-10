import { useState } from "react";
import axios from "../config";
import Swal from "sweetalert2";

const AddStaff = () => {
  const [inputUser, setInputUser] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios({
        method: "POST",
        url: "/add-user",
        data: inputUser,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
    } catch (error) {
      Swal.fire(`Error to Add Staff`, "???", "error")
    } finally {
      setLoading(false);
      setInputUser({ email: "", password: "", phoneNumber: "", address: "" });
    }
  }

  function handleOnChange(e) {
    const { name, value } = e.target;
    setInputUser({ ...inputUser, [name]: value });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={inputUser.email}
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            value={inputUser.password}
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            className="form-control"
            value={inputUser.phoneNumber}
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={inputUser.address}
            onChange={handleOnChange}
          />
        </div>
        <button disabled={loading} type="submit" className="btn btn-primary">
          {loading ? "....please wait" : "Add New Staff"}
        </button>
      </form>
    </>
  );
};
export default AddStaff;
