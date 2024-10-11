import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import AdminDashboard from "./AdminDashboard";
import axios from "axios";
import { toast } from "react-toastify";
import AddQuestionAnswer from "./components/AddQuestionAnswer";
import ManageQuestionAnswer from "./components/ManageQuestionAnswer";

const CreateExam = () => {
 
  return (
    <>
      <Layout>
        <AdminDashboard>
          <AddQuestionAnswer />
        </AdminDashboard>
      </Layout>
    </>
  );
};

export default CreateExam;
