import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import Layout from "../../Layout";
import ExamHeader from "./components/ExamHeader";
import Questions from "./components/Questions";
import axios from "axios";

const StartExam = () => {
  const params = useParams();
  const [question, setQuestions] = useState(null);
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [queLenght, setQueLen] = useState(0);


  return (
    <>
      <div className="d-none">
        <Layout title="Exam" />
      </div>
      <ExamHeader />
      <Questions />
    </>
  );
};

export default StartExam;
