import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../context/auth";

const UserDashboard = ({ children }) => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <div className="container dashboard mvh-100">
        <div className="row">
          <div className="col-md-4 bg-light">
            <div className="menu pt-3 d-flex flex-column justify-content-center align-items-center">
              <NavLink to="/dashboard/manage-profile">Manage Profile</NavLink>
              <NavLink to="/dashboard/select-test">Select a Test</NavLink>
            </div>
          </div>
          <div className="col-md-8">
            <div className="pt-3">{children}</div>
            {!children && (
              <>
                <h1 className="bg-secondary text-light p-5 text-center rounded">
                  Welcome {auth?.user?.name}
                </h1>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
