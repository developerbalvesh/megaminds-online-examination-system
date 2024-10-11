import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Helmet from "react-helmet";
import { ToastContainer } from "react-toastify";

const Layout = ({ children, title = "Home" }) => {
  return (
    <>
      <Helmet>
        <title>{`OES | ${title}`}</title>
      </Helmet>
      {/* <ToastContainer> */}
        <Header title={title} />
        <div className="">{children}</div>
        <Footer />
      <ToastContainer />
    </>
  );
};

export default Layout;
