import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import Dashboard from "../Dashboard";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import { toast } from "react-toastify";

const ManageProfile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const setProfile = () => {
    setName(auth?.user?.name);
    setAddress(auth?.user?.address);
  };

  const handleUpdate=async(e)=>{
    e.preventDefault();
    try {
        const {data} = await axios.put('/api/v1/auth/update-profile',{
            name, address, password
        })

        if(data.success){
            toast.success(data.message)
            setPassword("")
        }else{
            toast.error("Error while updating")
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    if (auth?.user) {
      setProfile();
    }
  }, []);


  return (
    <>
      <Dashboard>
        <div className="mvh-100">
          <div>
            <h5 className="text-light bg-primary p-2">Update profile</h5>
            <form className="shadow p-2" onSubmit={e=>handleUpdate(e)}>
              <label className="text-secondary">Name: </label>
              <input
                type="text"
                className="form-control mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label className="text-secondary mt-2">Email: </label>
              <input
                type="text"
                className="form-control mt-1"
                value={auth?.user?.email}
                disabled
              />
              <label className="text-secondary mt-2">Phone: </label>
              <input
                type="text"
                className="form-control mt-2"
                value={auth?.user?.phone}
                disabled
              />
              <label className="text-secondary mt-2">Address: </label>
              <input
                type="text"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <label className="text-secondary mt-2">Password: </label>

              <div className="password">
                <i
                  className={`fa-regular text-primary ${
                    showPass ? `fa-eye` : `fa-eye-slash`
                  }`}
                  onClick={() => setShowPass(!showPass)}
                ></i>
                <input
                  type={showPass ? "text" : "password"}
                  className="form-control"
                  placeholder="Put it empty if don't want to udpate password"
                  minLength="8"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-center mt-2">
              <button className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      </Dashboard>
    </>
  );
};

export default ManageProfile;
