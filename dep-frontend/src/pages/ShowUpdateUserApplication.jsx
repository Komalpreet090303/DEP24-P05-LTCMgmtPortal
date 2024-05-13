import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommentBox from "../components/CommentBox.jsx";
import ReviewApplication from "./ReviewApplication.jsx";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form.jsx";
import { toast } from "react-hot-toast";
import OfficeOrder from "../components/OfficeOrder.jsx";
import ListComment from "../components/ListComment.jsx";

export default function ShowUpdateUserApplication() {
  const { id } = useParams();
  const [show,setshow] = useState();

    
  return (
    <>
      <div className="max-w-screen-lg mx-auto py-4">
        <div className="max-w-screen-lg overflow-auto mx-auto py-4 text-center ">
          <Link to={`/applicant/update/${id}`}
         className="text-blue-500 font-semibold">Update Application</Link>
        </div>
        <div className="pb-8">  
          <ListComment />
          {/* <CommentBox readOnly /> */}
        </div>
      </div>
    </>
  );
}
