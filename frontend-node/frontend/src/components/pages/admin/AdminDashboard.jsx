import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../context/auth";

const AdminDashboard = ({ children }) => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <div className="container dashboard">
        <div className="row">
          <div className="col-md-4 bg-light">
            <div className="menu pt-3 d-flex flex-column justify-content-center align-items-center">
              <NavLink to="/dashboard/create-subject">Create Subject</NavLink>
              <NavLink to="/dashboard/create-exam">Create Exam</NavLink>
              <NavLink to="/dashboard/manage-exam">Manage Exam</NavLink>
              <NavLink to="/dashboard/show-result">Show Exam Result</NavLink>
            </div>
          </div>
          <div className="col-md-8">
            <div className="pt-3">{children}</div>
            {!children && (
              <>
                <div className="mvh-100">
                  <h1 className="bg-secondary text-light p-5 text-center rounded">
                    Welcome {auth?.user?.name}
                  </h1>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
