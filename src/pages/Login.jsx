import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../features/auth/authSlice";

const Login = () => {
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  //handleChange
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  //for redirect on another page
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //handlesubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (isError && message) {
      toast.error(message);
    }
  }, [user, isError, message]);

  if (isLoading) {
    return <h1 className="text-center my-5">Loading...</h1>;
  }

  return (
    <div className="container p-5">
      <h1 className="display-1 text-center">Login</h1>
      <div className="card my-4 shadow p-3">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Your Email"
            className="form-control my-2"
            name="email"
            onChange={handleChange}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            className="form-control my-2"
            name="password"
            onChange={handleChange}
            value={password}
            required
          />

          <button className="btn btn-success w-100 my-2">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
