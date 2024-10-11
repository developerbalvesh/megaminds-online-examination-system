import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

const Results = () => {
  const [result, setResult] = useState(null);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const fetchResult = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/result/get-result/${params.id}`
      );
      if (data.success) {
        setResult(data.result);
        setTimeout(() => {
          setLoading(false);
        }, 0);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(`Something wasn't right`);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchResult();
    }
  }, []);

  return (
    <Layout>
      {loading ? (
        <>
          <div className="animate__animated animate__fadeIn">
            <div className="mvh-100 d-flex justify-content-center align-items-center flex-column">
              <i className="fa-brands fa-slack fs-2 text-primary rotate"></i>
              <p className="p-2 text-secondary">Now loading...</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="animate__animated animate__fadeIn">
            <div className="mvh-100">
              <div className="container mt-3">
                <div className="result shadow p-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="">
                      Candidate name:{" "}
                      <span className="border p-1">{result?.users?.name}</span>
                    </h5>
                    <h5>
                      Subject:{" "}
                      <span className="border p-1">
                        {result?.subjects?.name}
                      </span>
                    </h5>
                  </div>
                  <hr />
                  <div>
                    <p className="m-0 p-0">
                      <strong>Exam date: </strong>
                      {/* {result?.exams?.createdAt} */}
                      {moment(result?.exams?.createdAt).format("LL")}
                      {/* {moment(result?.exams?.createdAt).format("L")} */}
                    </p>
                    {/* {JSON.stringify(result?.selections)} */}
                  </div>
                  <div>
                    <p className="bg-secondary text-light p-1 m-0 mt-3">
                      <strong>Questions: </strong>
                    </p>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Questions</th>
                          <th scope="col">Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result?.selections.map((s, i) => (
                          <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{s?.questions?.question}</td>
                            <td>
                              {s?.correct ? (
                                <span className="p-1 text-success shadow-sm">
                                  Correct
                                </span>
                              ) : (
                                <span className="p-1 text-danger shadow-sm">
                                  Incorrect
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="bg-secondary text-light p-1 m-0 mt-4">
                      <strong>Marking: </strong>
                    </p>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Total</th>
                          <th scope="col">Obtained</th>
                          <th scope="col">Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">{result?.total}</th>
                          <td>{result?.obtained}</td>
                          <td>{result?.percentage}%</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="p-2 d-flex align-items-center justify-content-evenly">
                      <h5>Status:</h5>
                      {result?.result?(
                        <button className="btn btn-success">Pass!</button>

                      ):(

                      <button className="btn btn-danger">Fail!</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Results;
