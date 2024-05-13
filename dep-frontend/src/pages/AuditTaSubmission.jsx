import React from "react";
import CommentBox from "../components/CommentBox.jsx";
import Modal from "../components/Modal.jsx";
import ReviewTaApplication from "./ReviewTaApplication.jsx";
import { useNavigate,useParams} from "react-router";
import { toast } from "react-hot-toast";
import {Link} from "react-router-dom"

export default function AuditTaSubmission() {

  const { id } =useParams();
  const navigate = useNavigate();


  const handleAuditTaResponse = (res) => {
    if (res.status == 200) {
      navigate("/audit/pendingTa");
    } else {
      toast("You are not authorized");
    }
  };


  const auditOnTaAccept = (e) => {
    const auditTaData = {};
    const status = "ACCEPT";
    const auditTaComment = document.querySelector('[name="comment"]');
    auditTaData["comment"] = auditTaComment.value;
    auditTaData["status"] = status;
    auditTaData["formId"] = id;


    fetch("/api/submitTAAuditData", {
      method: "POST",
      body: JSON.stringify(auditTaData),
      headers : {
        'Content-Type': 'application/json'
     },
    }).then(handleAuditTaResponse);

  };

  const auditOnTaReview = (e) => {
    const auditTaData = {};
    const status = "REVIEW";
    const auditTaComment = document.querySelector('[name="comment"]');
    auditTaData["comment"] = auditTaComment.value;
    auditTaData["status"] = status;
    auditTaData["formId"] = id;

    if(auditTaComment.value === "")
    {
      toast.error("Please Comment the reason for rejection",{
        duration: 3000,
      }) 
      return
    }
    fetch("/api/submitTAAuditData", {
      method: "POST",
      body: JSON.stringify(auditTaData),
      headers : {
        'Content-Type': 'application/json'
     },
    }).then(handleAuditTaResponse);

  };

  return (
    <div className="max-w-screen-xl mx-auto mt-4">
      <h3 className="font-semibold text-xl text-gray-900 m-4 flex mx-auto">For use by the Audit Section</h3>
      {/* <Modal>
        <ReviewTaApplication />
      </Modal> */}
      <div className="mt-4 text-center">
        <Link to={`/view/completeta/${id}`}
         className="text-blue-500 font-semibold">View Application</Link></div>
      <CommentBox  onAccept={auditOnTaAccept} onReview={auditOnTaReview} />
    </div>
  );
}
