import React, { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import Layout from "../../Layout";
import axios from "axios";
import { toast } from "react-toastify";

const CreateSubject = () => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [subjects, setSubjects] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setDisabled(true);
      const { data } = await axios.post("/api/v1/subject/create", {
        name,time
      });

      if (data.success) {
        toast.success(data.message);
        setDisabled(false);
        setName("");
        getSubjects();
      } else {
        setDisabled(false);
        toast.error(data.message);
      }
    } catch (error) {
      setDisabled(false);
      console.log(error);
    }
  };

  const getSubjects = async () => {
    try {
      const { data } = await axios.get("/api/v1/subject/all");

      if (data.success) {
        setSubjects(data.subjects);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSubject = async (id) => {
    try {
      console.log(id);
      setDisabled(true);
      const { data } = await axios.delete(`/api/v1/subject/delete/${id}`);
      if (data.success) {
        setDisabled(false);
        toast.error(data.message);
        getSubjects();
      } else {
        setDisabled(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      setDisabled(false);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);
  return (
    <Layout>
      <AdminDashboard>
        <div className="animate__animated animate__fadeIn mvh-100">
          <h4 className="bg-secondary p-3 m-0 fs-5 w-100 text-light">
            Create Subjects
          </h4>
          <form className="border p-2" onSubmit={(e) => handleSubmit(e)}>
            <label className="form-label">Subject name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex. English 2nd term exam"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="mt-2">Time (In Minutes)</label>
            <input
              type="number"
              className="mt-2 form-control"
              placeholder="1hr 30min = 90"
              min={1}
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <button
              className="btn-success btn mt-2 w-100 text-center"
              disabled={disabled}
            >
              {disabled ? <i className="fa-solid fa-fan rotate"></i> : `Add`}
            </button>
          </form>

          <h4 className="bg-secondary p-3 m-0 mt-3  fs-5 w-100 text-light">
            Manage Subjects
          </h4>
          <div className="border  p-2">
            {subjects?.map((s) => (
              <div key={s._id} className="border p-2 row m-2">
                <div className="col-sm-6">
                  <p className="p-0 m-0">{s.name} <span className="ms-2 text-secondary">({s.time} min)</span></p>
                </div>
                <div className="col-sm-6 text-end">
                  <button
                    className="btn btn-danger"
                    disabled={disabled}
                    onClick={() => deleteSubject(s._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminDashboard>
    </Layout>
  );
};

export default CreateSubject;
