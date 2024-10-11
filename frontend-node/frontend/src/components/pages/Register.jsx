import React, { useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [disabled, setDisabled] = useState(false);
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setDisabled(true);
      const { data } = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        address,
        phone,
      });
      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setDisabled(false);
    }
  };
  return (
    <Layout title="Register">
      <div className="container home login">
        <div className="d-flex justify-content-center align-items-center">
          <div className="border p-3">
            <h2>
              <span className="text-primary">Register</span> to continue
            </h2>
            <form className="text-center" onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                className="form-control m-1"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
                  minLength="8"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control m-1"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {/* <input type="text" className="form-control m-1" placeholder="Address" /> */}
                <textarea
                  name=""
                  id=""
                  className="form-control m-1"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>
              <button disabled={disabled} className="btn btn-primary m-1">
                {disabled ? (
                  <>
                    <div className="spinner"></div>
                  </>
                ) : (
                  `Register`
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
