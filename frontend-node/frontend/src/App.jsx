import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "animate.css";
import Layout from "./components/Layout";
import Login from "./components/pages/Login";
import { Route, Routes, useActionData } from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./context/auth";
import Dashboard from "./components/pages/Dashboard";
import Spinner from "./components/pages/Spinner";
import PrivateUser from "./components/Routes/PrivateUser";
import PrivateAdmin from "./components/Routes/PrivateAdmin";
import CreateSubject from "./components/pages/admin/CreateSubject";
import CreateExam from "./components/pages/admin/CreateExam";
import ManageExam from "./components/pages/admin/ManageExam";
import ManageProfile from "./components/pages/User.jsx/ManageProfile";
import SelectTest from "./components/pages/User.jsx/SelectTest";
import StartExam from "./components/pages/User.jsx/StartExam";
import ShowResults from "./components/pages/admin/ShowResults";
import Results from "./components/pages/Results";

function App() {
  const [count, setCount] = useState(0);
  const [auth, setAuth] = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results/:id" element={<Results />} />
        <Route path="/dashboard" element={<PrivateUser />}>
          <Route path="" element={<Dashboard />} />
          <Route path="" element={<PrivateAdmin />}>
            <Route path="create-subject" element={<CreateSubject />} />
            <Route path="create-exam" element={<CreateExam />} />
            <Route path="manage-exam" element={<ManageExam />} />
            <Route path="show-result" element={<ShowResults />} />
          </Route>
          <Route path="manage-profile" element={<ManageProfile />} />
          <Route path="select-test" element={<SelectTest />} />
          <Route path="start-exam/:id" element={<StartExam />} />
        </Route>
        {auth?.user ? (
          <></>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
