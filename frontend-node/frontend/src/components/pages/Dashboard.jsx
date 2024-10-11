import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import AdminDashboard from "./admin/AdminDashboard";
import UserDashboard from "./User.jsx/UserDashboard";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Dashboard = ({children}) => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  const checkAdmin = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/isadmin");
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if(auth?.user){
        checkAdmin();
    }
  },[auth?.user])
  return (
    <>
      <Layout title={ok?`Admin Dashboard`:`User Dashboard`}>
        {ok ? (
          <>
            <AdminDashboard />
          </>
        ) : (
          <>
            <UserDashboard children={children} />
          </>
        )}
      </Layout>
    </>
  );
};

export default Dashboard;
