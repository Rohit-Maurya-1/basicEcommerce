import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout/Layout";

const Pagenotfound = () => {
 
  return (
    <Layout title={"go back- page not found"}>
      <div className="pnf">
        <div className="p">
       <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
      </div>
    </Layout>
  );
};

export default Pagenotfound;