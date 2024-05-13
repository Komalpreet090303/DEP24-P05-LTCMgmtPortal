import React, { useEffect, useState, createContext, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Main from "./Main.jsx";
import { LoginContext } from "../LoginContext.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);
  const [user, setUser] = useContext(LoginContext);
  useEffect(() => {
    if (user.isApplicant) {
      navigate("/applicant");
    } else if (user.isAdmin) {
      console.log("yes");
      navigate("/admin/userdisplay");
    } else {
      console.log("no");
      navigate("/landing");
    }
  }, []);
  return (
    <>
      {/* bg-[url('../../public/About_IIT_Ropar_banner_d0c869852d.webp')] bg-cover   */}
      <div className="dashboard-container">
        <div>
        <Navbar />
        </div>
        
        {/* <div className="dashboard-content"> */}
        <Main />
        {/* </div> */}
      </div>
    </>
  );
}
