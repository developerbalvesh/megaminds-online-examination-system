import React, { useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.jsx";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setDisabled(true);
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          setAuth({ ...auth, user: data.user, token: data.token });
          localStorage.setItem("auth", JSON.stringify(auth));
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setDisabled(false);
    }
  };
  return (
    <Layout title="Login">
      <div className="container home login">
        <div className="d-flex justify-content-center align-items-center">
          <div className="border p-3">
            <h2>
              <span className="text-primary">Login</span> to continue
            </h2>
            <form className="text-center" onSubmit={(e) => handleSubmit(e)}>
              <input
                type="email"
                className="form-control m-1"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="password">
                <i
                  className={`fa-regular text-primary ${
                    showPass ? `fa-eye` : `fa-eye-slash`
                  }`}
                  onClick={() => setShowPass(!showPass)}
                ></i>
                <input
                  type={showPass ? "text" : "password"}
                  className="form-control m-1"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button disabled={disabled} className="btn btn-primary m-1">
                {disabled ? (
                  <>
                    <div className="spinner"></div>
                  </>
                ) : (
                  `Login`
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
