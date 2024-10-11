import React, { useEffect } from "react";
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Spinner = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  return (
    <>
      <Layout title="Loading">
        <div className="container home">
          <div className="d-flex justify-content-center align-items-center">
            <h4 className="text-secondary">Loading...</h4>
            <div className="spinner" style={{ borderColor: "blue" }}></div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Spinner;
