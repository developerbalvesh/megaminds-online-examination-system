import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Questions = () => {
  const params = useParams();
  const [question, setQuestions] = useState(null);
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [allQueLen, setAllQueLen] = useState(0);
  const [paginate, setPaginate] = useState([]);
  const [answer, setAnswer] = useState(0);
  const [examId, setExamId] = useState("");

  // get questions
  const getQuestions = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/question/get-all/${params.id}/${index}`
      );
      if (data.success) {
        if (data.question) {
          setQuestions(data.question);
          setAllQueLen(data.length);
          resetRadio();
        } else {
          alert("something went wrong");
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get answers
  const selectedAnswers = async () => {
    try {
      // console.log(question._id, examId)
      const { data } = await axios.post("/api/v1/answer/existed-answer", {
        questions: question._id,
        examId,
      });
      if (data.success) {
        setAnswer(data.answer[0].answer);
      } else {
        setAnswer(0);
      }
    } catch (error) {
      setAnswer(0);
      console.log(error);
    }
  };

  // uncheck/reset radio
  const resetRadio = () => {
    setAnswer(0);
    const opt = document.getElementsByClassName("form-check-input");
    opt[0].checked = false;
    opt[1].checked = false;
    opt[2].checked = false;
    opt[3].checked = false;
  };

  // get Exam Id
  const getExamId = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/start-exam/details/${params.id}`
      );
      if (data.success) {
        setExamId(data?.exam[0]?._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // pagination
  const pagination = async () => {
    let arr = [];
    for (let j = 0; j < allQueLen; j++) {
      arr.push(
        <span
          key={j}
          onClick={() => {
            setIndex(j);
          }}
          className={`p-1 m-1 text-light ${
            index === j ? `bg-dark` : "bg-secondary"
          }`}
        >
          {j + 1}
        </span>
      );
    }
    setPaginate(arr);
  };

  // upload answer on change
  const uploadAnswer = async (a) => {
    try {
      setAnswer(a);

      const { data } = await axios.put("/api/v1/answer/upload", {
        examId,
        questions: question,
        answer: a,
      });
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestions();
    getExamId();
  }, []);

  useEffect(() => {
    if (allQueLen) {
      pagination();
    }
  }, [allQueLen]);

  useEffect(() => {
    getQuestions();
    pagination();
  }, [index]);

  useEffect(() => {
    if (question && examId) {
      selectedAnswers();
    }
  }, [question, examId, index]);

  return (
    <div className="container questions">
      <div className="p-3">
        <h5 className="bg-dark text-light p-1 m-0">
          {index + 1}) {question?.question}
        </h5>
        <div className="container-fluid">
          {answer ? (
            <p className="bg-success m-1 p-1 text-light animate__animated animate__fadeInDown">
              <strong>Uploaded answer:</strong> {answer}
            </p>
          ) : (
            ""
          )}
          <div className="row">
            <div className="col-md-6">
              <div className="border p-2 m-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    value={1}
                    onChange={(e) => uploadAnswer(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    {question?.option1}
                  </label>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="border p-2 m-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value={2}
                    onChange={(e) => uploadAnswer(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    {question?.option2}
                  </label>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="border p-2 m-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault3"
                    value={3}
                    onChange={(e) => uploadAnswer(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault3"
                  >
                    {question?.option3}
                  </label>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="border p-2 m-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault4"
                    value={4}
                    onChange={(e) => uploadAnswer(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault4"
                  >
                    {question?.option4}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-2">{paginate.map((p, i) => p)}</div>
        <div className="text-center mt-3">
          <button
            className="btn btn-warning m-1"
            onClick={() => {
              setIndex(index - 1);
            }}
            disabled={index <= 0 ? true : false}
          >
            Previous
          </button>
          <button
            className="btn btn-success m-1"
            onClick={() => {
              setIndex(index + 1);
            }}
            disabled={index + 1 >= allQueLen ? true : false}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
