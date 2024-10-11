import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddQuestionAnswer = () => {
  const [subjects, setSubjects] = useState(null);
  const [examId, setExamId] = useState("");
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState(0);
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

  useEffect(() => {
    getSubjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!answer) {
        toast.error("Please select answer!");
        return;
      }

      const questionFinale = {
        examId,
        question,
        option1,
        option2,
        option3,
        option4,
        answer,
      };
      console.log(questionFinale);

      const { data } = await axios.post("/api/v1/question/create", {
        questionFinale,
      });

      if (data.success) {
        toast(data.message);
        let radio = document.getElementsByClassName("form-check-input");
        radio[answer - 1].checked = false;
        setQuestion("");
        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");
        setAnswer(0);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.log();
      toast.error("Error");
    }
  };
  return (
    <>
      <div className="border border-secondary rounded mb-3 animate__animated animate__fadeIn">
        <h3 className="p-2 text-light bg-secondary">
          Select Exam and Enter question with answer
        </h3>
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
        <form className="m-2" onSubmit={(e) => handleSubmit(e)}>
          <label
            htmlFor="question"
            className="form-label mt-3 bg-secondary text-light p-1 w-100"
          >
            Enter question
          </label>
          <input
            required
            className="form-control"
            placeholder="Ex. Capital of India?"
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <label className="form-label mt-3 bg-secondary text-light p-1 w-100">
            Enter Options and select answer
          </label>
          <div className="form-check">
            <input
              className="form-check-input mt-2"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              onClick={() => setAnswer(1)}
            />
            <input
              className="form-control mb-2"
              placeholder="Ex. Delhi"
              type="text"
              id="question"
              value={option1}
              required
              onChange={(e) => setOption1(e.target.value)}
            />
          </div>
          <div className="form-check">
            <input
              className="form-check-input mt-2"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              onClick={() => setAnswer(2)}
            />
            <input
              className="form-control mb-2"
              placeholder="Ex. Mumbai"
              type="text"
              id="question"
              value={option2}
              required
              onChange={(e) => setOption2(e.target.value)}
            />
          </div>
          <div className="form-check">
            <input
              className="form-check-input mt-2"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              onClick={() => setAnswer(3)}
            />
            <input
              className="form-control mb-2"
              placeholder="Ex. Nagpur"
              type="text"
              id="question"
              value={option3}
              required
              onChange={(e) => setOption3(e.target.value)}
            />
          </div>
          <div className="form-check">
            <input
              className="form-check-input mt-2"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              onClick={() => setAnswer(4)}
            />
            <input
              className="form-control mb-2"
              placeholder="Ex. none of the above"
              type="text"
              id="question"
              value={option4}
              required
              onChange={(e) => setOption4(e.target.value)}
            />
          </div>
          <button className="btn btn-success w-100" disabled={disabled}>
            {disabled ? (
              <>
                <i className="rotate fa-solid fa-hourglass-half"></i>
              </>
            ) : (
              "Add"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddQuestionAnswer;
