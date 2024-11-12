import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../features/auth/authSlice";

const Register = () => {
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  //for redirect on another page
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Password Not Match!");
    } else {
      dispatch(registerUser(formData));
    }
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
      <h1 className="display-1 text-center">Register</h1>
      <div className="card my-4 shadow p-3">
        <form onSubmit={handleSubmit}>
          <input
            type="name"
            placeholder="Enter Your Name"
            className="form-control my-2"
            name="name"
            onChange={handleChange}
            value={name}
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-control my-2"
            name="password2"
            onChange={handleChange}
            value={password2}
            required
          />
          <button className="btn btn-success w-100 my-2">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
