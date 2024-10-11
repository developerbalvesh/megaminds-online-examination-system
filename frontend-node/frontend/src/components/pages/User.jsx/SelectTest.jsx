import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AlreadyStartedExamList from "./components/AlreadyStartedExamList";

const SelectTest = () => {
  const [examId, setExamId] = useState("");
  const [subjects, setSubjects] = useState(null);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);

  const getSubjects = async () => {
    try {
      const { data } = await axios.get("/api/v1/subject/all");

      if (data.success) {
        setSubjects(data.subjects);
        setExamId(data.subjects[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startExam = async (e) => {
    e.preventDefault();
    try {
      setDisabled(true);
      const { data } = await axios.post("/api/v1/start-exam/start", {
        examId,
      });

      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          navigate(`/dashboard/start-exam/${examId}`);
        }, 2000);
      } else {
        toast.error(data.message);
        setDisabled(false);
      }
    } catch (error) {
      console.log(error);
      setDisabled(false);
    }
  };

  const getExamDetails = async () => {
    try {
      const { data } = await axios.get(`/api/v1/subject/single/${examId}`);

      if (data.success) {
        setSelected(data.subject);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  useEffect(() => {
    if (examId) {
      getExamDetails();
    }
  }, [examId]);
  return (
    <Dashboard>
      <div className="mvh-100">
        <h3 className="bg-dark text-light p-2 m-0">Select a test to start</h3>
        <form className="border p-3 m-0">
          <select
            onChange={(e) => setExamId(e.target.value)}
            className="form-select"
            aria-label="select example"
            value={examId}
          >
            {subjects?.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
          <div className="text-center mt-2">
            <button
              className="btn btn-dark"
              disabled={!selected?.length ? true : disabled}
              onClick={(e) => startExam(e)}
>
              Start
            </button>
          </div>
          <div className="border mt-2">
            <h5 className="p-2 bg-dark text-light">{selected?.name}</h5>
            <p className="p-0 m-0 ps-2">Duration: {selected?.time} min</p>
            <p className="p-0 m-0 ps-2 pb-2">
              Total Questions: {selected?.length}
            </p>
          </div>
        </form>
        <AlreadyStartedExamList />
      </div>
    </Dashboard>
  );
};

export default SelectTest;
