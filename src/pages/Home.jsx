import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="container p-5">
      <h1 className="display-1 text-center">Home</h1>
      <Link to={"/user/setting"}> Settings</Link>
      <Link to={"/user/profile"}> Profile</Link>
    </div>
  );
};

export default Home;
