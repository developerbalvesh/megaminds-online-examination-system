import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AlreadyStartedExamList = () => {
  const [disabled, setDisabled] = useState(false);
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  const getExams = async () => {
    try {
      const { data } = await axios.get("/api/v1/start-exam/status");

      if (data.success) {
        setExams(data?.exams);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resumeExam = async (id) => {
    try {
      navigate(`/dashboard/start-exam/${id}`);
    } catch (error) {}
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
    <>
      <h3 className="bg-dark text-light p-2 m-0 mt-3">Exam status:</h3>
      {exams?.map((e, i) => (
        <div key={i} className="border p-3 m-0">
          <div className="border mt-2">
            <h5 className="p-2 bg-dark text-light">{e.examName}</h5>
            <p className="p-0 m-0 ps-2">Duration left: {e?.time}</p>
            <p className="p-0 m-0 ps-2 pb-2">
              <span className="text-dark fw-semibold">Status: </span>
              {e?.inProgress ? (
                <>
                  In progress{" "}
                  <button
                    className="btn btn-warning"
                    onClick={() => resumeExam(e?.subjects)}
                  >
                    Resume
                  </button>
                </>
              ) : (
                <>
                  {!e?.resultStatus ? (
                    <button className="btn btn-danger m-1">Ended !</button>
                  ) : (
                    <button className="btn btn-success m-1" onClick={()=>navigate(`/results/${e?._id}`)}>
                      Show result !
                    </button>
                  )}
                </>
              )}
            </p>
          </div>
        </div>
      ))}
      {exams[0] ? (
        ""
      ) : (
        <div className="p-3 text-center text-secondary">
          <h3 className="text-secondary">No records found !</h3>
        </div>
      )}
    </>
  );
};

export default AlreadyStartedExamList;
