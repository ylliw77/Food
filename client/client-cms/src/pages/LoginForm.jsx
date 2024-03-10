import { useState } from "react";
import axios from "../config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginForm() {
  const nav = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      setLoading(true);
      const { data } = await axios({
        method: "POST",
        baseURL: "/login",
        data: input,
      });
      localStorage.setItem("access_token", data.access_token);
      nav("/dash");
    } catch (error) {
      Swal.fire(`Invalid email/password`, "???", "error");
    } finally {
      setLoading(false);
    }
  };

  function handleOnChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }
  return (
    <>
      <div className="container-fluid">
        <div
          className="row h-100 align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h3>Login</h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    onChange={handleOnChange}
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder="name@example.com"
                  />
                  <label>Email address</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    onChange={handleOnChange}
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  <label>Password</label>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-4"></div>
                <button
                  type="submit"
                  className="btn btn-primary py-3 w-100 mb-4"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "...Validating your account please wait"
                    : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
