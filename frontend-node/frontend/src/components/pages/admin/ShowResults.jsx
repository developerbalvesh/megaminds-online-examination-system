import React, { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import Layout from "../../Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const ShowResults = () => {
  const [subjects, setSubjects] = useState([]);
  // const [subjectId, setSubjectId] = useState("");
  const [exams, setExams] = useState(null);
  const [selected, setSelected] = useState("");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();


  // get list of subjects
  const getAllSubjects = async () => {
    try {
      const { data } = await axios.get("/api/v1/subject/all");
      if (data.success) {
        setSubjects(data.subjects);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get exam details
  const getExamDetails = async () => {
    try {
      // setSubjectId(selected);
      if (!selected) {
        setExams(null);
        return;
      }

      const { data } = await axios.get(
        `/api/v1/start-exam/subject-exams/${selected}`
      );

      if (data.success && data.exams) {
        setExams(data.exams);
      } else {
        setExams(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // update time of exam
  const updateTime = async (e, id) => {
    e.preventDefault();
    const time = document.getElementById(id).value;
    if (!time) {
      toast("Empty field not allowed");
      return;
    }
    try {
      const { data } = await axios.put("/api/v1/start-exam/add-time", {
        id,
        time,
      });
      if (data.success) {
        toast.success(data.message);
        getExamDetails();
        document.getElementById(id).value = "";
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // generate result
  const generateResults = async () => {
    try {
      setDisabled(true);
      if (!selected) {
        setDisabled(false);
        toast("Please select an exam");
        return;
      }
      const { data } = await axios.get(`/api/v1/result/generate/${selected}`);

      if (data?.success) {
        getExamDetails();
        setTimeout(() => {
          setDisabled(false);
          toast.success(data.message);
        }, 2000);
      }
    } catch (error) {
      setDisabled(false);
      toast.error("Server error");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSubjects();
  }, []);

  useEffect(() => {
    if (selected) {
      getExamDetails();
    }
  }, [selected]);

  return (
    <>
      <Layout>
        <AdminDashboard>
          <div className="mvh-100 animate__animated animate__fadeIn">
            <div className="border">
              <h3 className="bg-dark m-0 p-1 text-light">Select Exams</h3>
              <div className="p-2">
                <select
                  onChange={(e) => setSelected(e.target.value)}
                  value={selected}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="">Please Select an Exam</option>
                  {subjects?.map((s) => (
                    <option value={s._id} key={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex align-items-center justify-content-between bg-dark text-light m-0 mt-2  p-0">
                <h3 className="p-1">List of Candidates</h3>
                <button
                  className="btn btn-light m-1"
                  onClick={() => generateResults()}
                >
                  Generate result
                </button>
              </div>
              <div className="bg-secondary text-light p-1">
                <strong>Notes:</strong>
                <ol className="m-0">
                  <li>Results will be generated of completed exams</li>
                  <li>40% will be passing</li>
                  <li>
                    Result will be generated only once per exams/candidates
                  </li>
                </ol>
              </div>
              {exams?.map((e, i) => (
                <div key={i} className="p-1 m-1 border shadow">
                  <p className="p-1 m-1">
                    <strong>Exam name: </strong>
                    {e?.subjects?.name}
                    <br />
                    <strong>Candidate name: </strong>
                    {e?.users?.name}
                    <br />
                    <strong>Exam status: </strong>{" "}
                    {e?.completed ? (
                      <span className="text-success">Completed</span>
                    ) : (
                      <span className="text-warning">In progress</span>
                    )}
                    <br />
                    <strong>Time left: </strong> {e?.time} min
                  </p>
                  {e?.resultStatus ? (
                    <>
                      <div className="text-center">
                        <button className="btn btn-success" onClick={()=>navigate(`/results/${e?._id}`)}>Show result</button>
                      </div>
                    </>
                  ) : (
                    <form
                      onSubmit={(ev) => updateTime(ev, e._id)}
                      className="w-100 d-flex align-items-center gap-1"
                    >
                      <input
                        className="form-control w-50"
                        type="number"
                        placeholder="Enter time in minutes"
                        id={e?._id}
                      />
                      <button className="btn btn-success">Update time</button>
                    </form>
                  )}
                </div>
              ))}
              {!exams ? (
                <div className="p-3 text-center">No records found!</div>
              ) : (
                ""
              )}
            </div>
          </div>
          {disabled ? (
            <div className="wait animate__animated animate__fadeIn d-flex flex-column align-items-center justify-content-center">
              <h5 className="text-light bg-dark p-2 shadow rounded">
                Generating... <i className="fa-solid fa-receipt rotate"></i>
              </h5>
              <p className="bg-dark text-light p-1">
                Don't refresh page while generating. result of only completed
                exam will be generated. 40% will be passing.
              </p>
            </div>
          ) : (
            ""
          )}
        </AdminDashboard>
      </Layout>
    </>
  );
};

export default ShowResults;
