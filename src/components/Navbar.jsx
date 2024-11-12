import React, { useDebugValue } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOutUser } from "../features/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOutUser());
  };

  return (
    <nav className="navbar bg-dark">
      <div className="container-fluid">
        <Link to={"/"}>
          <span className="navbar-brand mb-0 h1 text-white">Auth App</span>
        </Link>
        <span>
          {!user ? (
            <>
              <Link
                to={"/register"}
                className="btn btn-sm btn-success mx-1 text-white"
              >
                Register
              </Link>
              <Link to={"/login"} className="btn btn-sm btn-primary mx-1">
                Login
              </Link>
            </>
          ) : (
            <button
              className="btn btn-sm btn-danger mx-1"
              onClick={handleLogOut}
            >
              Logout
            </button>
          )}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
