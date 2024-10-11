import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";

const Header = ({ title }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate=useNavigate();

  const logOut = () => {
    setTimeout(() => {
      toast.success('Logging out')
    }, 100);
    localStorage.removeItem("auth");
    setAuth({ user: null, token: "" });
    navigate("/")
  };
  return (
    <>
      <nav className="header bg-light border-bottom border-2 header ">
        <div className="container d-flex justify-content-between align-items-center p-2">
          <div className="heading d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <h3 className="text-primary pe-2">OES</h3>
              <h5 className="text-secondary border-start border-3 ps-2">
                {title}
              </h5>
            </div>
            <div>
              <i
                className={`fs-3 text-secondary fa-solid ${
                  !showMenu ? `fa-bars` : `fa-xmark`
                }`}
                onClick={() => setShowMenu(!showMenu)}
              ></i>
              {/* <i class="fs-3 text-secondary fa-solid fa-xmark"></i> */}
            </div>
          </div>
          <div className={showMenu ? "" : "menu"}>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              {!auth?.user ? (
                <>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                    <button className="btn btn-danger" onClick={() => logOut()}>
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
