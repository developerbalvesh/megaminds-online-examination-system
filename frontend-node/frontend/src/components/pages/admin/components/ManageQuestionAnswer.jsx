import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageQuestionAnswer = () => {
  const [subjects, setSubjects] = useState(null);
  const [examId, setExamId] = useState("");
  const [disp, setDisp] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [search, setSearch] = useState("");
  const [nQuestion, setNQuestion] = useState("");
  const [nOpt1, setNOpt1] = useState("");
  const [nOpt2, setNOpt2] = useState("");
  const [nOpt3, setNOpt3] = useState("");
  const [nOpt4, setNOpt4] = useState("");
  const [nAns, setNAns] = useState(0);
  const [nId, setNId] = useState("");

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

  const fetchQuestions = async () => {
    try {
      const { data } = await axios.get(`/api/v1/question/get-by-id/${examId}`);
      setSearch("");

      if (data.success) {
        if (data.questions[0]) {
          setQuestions(data.questions);
        } else {
          setQuestions(null);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchQuestion = async () => {
    try {
      const { data } = await axios.post("/api/v1/question/search", {
        search,
        examId,
      });

      if (data.success) {
        if (data.result[0]) {
          setQuestions(data.result);
        } else {
          setQuestions(null);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setUpdateData = (q) => {
    setNQuestion(q.question);
    setNOpt1(q.option1);
    setNOpt2(q.option2);
    setNOpt3(q.option3);
    setNOpt4(q.option4);
    setNAns(q.answer);
    setNId(q._id);
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/question/update", {
        question: nQuestion,
        option1: nOpt1,
        option2: nOpt2,
        option3: nOpt3,
        option4: nOpt4,
        answer: nAns,
        _id: nId,
      });

      if (data.success) {
        fetchQuestions();
        toast.success(data.message);
        setDisp(false);
      } else {
        toast.error("Error");
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
      fetchQuestions();
    }
  }, [examId]);

  useEffect(() => {
    searchQuestion();
  }, [search]);
  return (
    <div className="border manage-question animate__animated animate__fadeIn">
      <h3 className="bg-secondary text-light p-2">Manage Question</h3>
      <form className="m-2">
        <label className="form-label mt-3 bg-secondary text-light p-1 w-100">
          Select Exam
        </label>{" "}
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
      </form>
      <div className="m-2">
        <input
          type="text"
          placeholder="Search for questions and options"
          className="form-control mb-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {questions ? (
          <>
            {questions.map((q, i) => (
              <div
                key={q._id}
                className="mt-1 border border-primary p-1 rounded"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="bg-dark text-light p-0 m-0 p-1 rounded">
                    {i + 1}) {q.question}
                  </h5>
                  <div className="text-end">
                    <button
                      className="btn btn-primary p-1 m-1"
                      onClick={() => {
                        setDisp(!disp);
                        setUpdateData(q);
                      }}
                    >
                      Update
                    </button>
                    <button className="btn btn-danger p-1 m-1">Delete</button>
                  </div>
                </div>

                <ol className="mt-3">
                  <li>{q.option1}</li>
                  <li>{q.option2}</li>
                  <li>{q.option3}</li>
                  <li>{q.option4}</li>
                </ol>

                <p className="text-success ms-2">Answer: {q.answer}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="text-center p-3 text-danger">
              <p>No questions found</p>
            </div>
          </>
        )}
      </div>
      <div
        className={`model d-flex justify-content-center align-items-start ${
          disp ? `` : `d-none`
        }`}
      >
        <div className="box mt-5 rounded shadow animate__animated animate__bounceInDown">
          <div className="d-flex p-2 bg-primary text-light justify-content-between align-items-center">
            <h6 className="m-0 p-0">Update Question</h6>
            <i
              className="fa-solid fa-xmark "
              onClick={() => setDisp(!disp)}
            ></i>
          </div>
          <form className="p-1" onSubmit={(e) => handleUpdate(e, nId)}>
            <input
              type="text"
              className="form-control"
              placeholder="Ex. Capital of India?"
              value={nQuestion}
              onChange={(e) => setNQuestion(e.target.value)}
            />
            <div className="d-flex mt-2 mb-2 justify-content-center align-items-center">
              <input
                className="form-check-input me-2 ms-2"
                type="radio"
                name="updateQuestion"
                checked={nAns === 1 ? true : false}
                onChange={() => setNAns(1)}
              />
              <input
                value={nOpt1}
                onChange={(e) => setNOpt1(e.target.value)}
                placeholder="Delhi"
                type="text"
                className="form-control"
              />
            </div>
            <div className="d-flex mt-2 mb-2 justify-content-center align-items-center">
              <input
                className="form-check-input me-2 ms-2"
                type="radio"
                name="updateQuestion"
                checked={nAns === 2 ? true : false}
                onChange={() => setNAns(2)}
              />
              <input
                value={nOpt2}
                onChange={(e) => setNOpt2(e.target.value)}
                placeholder="Delhi"
                type="text"
                className="form-control"
              />
            </div>
            <div className="d-flex mt-2 mb-2 justify-content-center align-items-center">
              <input
                className="form-check-input me-2 ms-2"
                type="radio"
                name="updateQuestion"
                checked={nAns === 3 ? true : false}
                onChange={() => setNAns(3)}
              />
              <input
                value={nOpt3}
                onChange={(e) => setNOpt3(e.target.value)}
                placeholder="Delhi"
                type="text"
                className="form-control"
              />
            </div>
            <div className="d-flex mt-2 mb-2 justify-content-center align-items-center">
              <input
                className="form-check-input me-2 ms-2"
                type="radio"
                name="updateQuestion"
                checked={nAns === 4 ? true : false}
                onChange={() => setNAns(4)}
              />
              <input
                value={nOpt4}
                onChange={(e) => setNOpt4(e.target.value)}
                placeholder="Delhi"
                type="text"
                className="form-control"
              />
            </div>
            <div className="text-center">
              <button className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageQuestionAnswer;
