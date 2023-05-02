import React from "react";
import SideProfile from "../components/SideProfile";
import { useParams } from "react-router-dom";
import FormInput from "../components/FormInput";
import "../assets/styles/details.scss";

const DetailPage = () => {
  return (
    <div className="container">
      <div className="d-flex justify-content-center detail-box">
        <SideProfile />
        <FormInput />
      </div>
    </div>
  );
};

export default DetailPage;
