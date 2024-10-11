import React, { useEffect, useState } from "react";
import Layout from "../../../Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Countdown from "react-countdown";
import { toast, ToastContainer } from "react-toastify";

const ExamHeader = () => {
  const [eName, setEname] = useState("welcome");
  const params = useParams();
  const [time, setTime] = useState(0);
  const navigate = useNavigate();
  const [examId, setExamId] = useState("");
  const [exams, setExams] = useState({});

  // initialize answer sheet
  const initializeAnswer = async () => {
    try {
      const { data } = await axios.post("/api/v1/answer/start", {
        examId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (examId) {
      initializeAnswer();
    }
  }, [examId]);

  // get exam details
  const getExamDetails = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/start-exam/details/${params?.id}`
      );

      if (data.success) {
        let tim = Math.floor(data.exam[0].time);
        if (!data.exam[0].time) {
          endExam();
        }
        if (
          !data.exam[0].completed &&
          data.exam[0].inProgress &&
          data.exam[0].time >= 0
        ) {
          let time = data.exam[0].time * 60000;
          setTime(time);
          setExamId(data.exam[0]._id);
          setExams(data.exam[0]);
        } else {
          setTimeout(() => {
            toast.error("Exam is already over!");
          }, 100);
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   update db time
  const udpateDBTime = async () => {
    try {
      if (examId) {
        const { data } = await axios.put("/api/v1/start-exam/update-time", {
          id: examId,
        });
        if (!data.success) {
          endExam();
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // end exam
  const endExam = async () => {
    try {
      if (examId) {
        toast.error("Exam ended !");
        const { data } = await axios.put("/api/v1/start-exam/end-exam", {
          examId,
        });
        if (data.success) {
          toast.warning(data.message);
        } else {
          toast.warning(data.message);
        }
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // click on submit
  const handleSubmit = () => {
    const conf = confirm("Are you sure??");
    if (conf) {
      endExam();
    }
  };

  //   countdown start
  // Random component
  const Completionist = () => (
    <span className="text-danger">Exam is ended</span>
  );

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (seconds === 30) {
      udpateDBTime();
    }
    if (completed) {
      endExam();
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div className="d-flex align-items-center">
          <i className="fa-solid fa-stopwatch"></i>
          <div>

          <span className="text-success border p-1 m-1">Hrs: {hours}</span>
          <span className="text-primary border p-1 m-1">Min: {minutes}</span>
          <span className="text-secondary border p-1 m-1">Sec: {seconds}</span>
          </div>
          
        </div>
      );
    }
  };
  // countdown end

  useEffect(() => {
    getExamDetails();
  }, []);

  return (
    <>
      <div className="d-none">
        <Layout title="Exam" />
      </div>
      <div className="bg-light">
        <div className="container">
          <div className="d-flex p-2 justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <h5 className="text-secondary">OES</h5>
              <h6 className="border-start ps-2 ms-2 border-2">
                {exams?.subjects?.name}
              </h6>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div>
                {time && (
                  <>
                    <Countdown date={Date.now() + time} renderer={renderer} />
                  </>
                )}
              </div>
              <button className="btn btn-danger" onClick={() => handleSubmit()}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ExamHeader;
