import React from 'react'
import CommentBox from "../components/CommentBox.jsx"
import Modal from '../components/Modal.jsx'
import ReviewApplication from './ReviewApplication.jsx'
import { useNavigate,useParams} from "react-router";
import { toast } from "react-hot-toast";
import {Link} from "react-router-dom"

export default function AuditSubmission() {
  const { id } =useParams();
  const navigate = useNavigate();

  const handleAuditResponse = (res) => {
    if (res.status == 200) {
      navigate("/audit/pending");
    } else {
      toast("You are not authorized");
    }
  };


  const auditOnAccept = (e) => {
    const auditData = {};
    const status = "ACCEPT";
    const auditComment = document.querySelector('[name="comment"]');
    auditData["comment"] = auditComment.value;
    auditData["status"] = status;
    auditData["formId"] = id;


    fetch("/api/submitAuditData", {
      method: "POST",
      body: JSON.stringify(auditData),
      headers : {
        'Content-Type': 'application/json'
     },
    }).then(handleAuditResponse);

  };

  const auditOnReview = (e) => {
    const auditData = {};
    const status = "REVIEW";
    const auditComment = document.querySelector('[name="comment"]');
    auditData["comment"] = auditComment.value;
    auditData["status"] = status;
    auditData["formId"] = id;

    if(auditComment.value === "")
    {
      toast.error("Please Comment the reason for rejection",{
        duration: 3000,
      }) 
      return
    }
    fetch("/api/submitAuditData", {
      method: "POST",
      body: JSON.stringify(auditData),
      headers : {
        'Content-Type': 'application/json'
     },
    }).then(handleAuditResponse);

  };


  return (
    <>
      <div className="max-w-screen-xl mx-auto">
      <br></br>
    {/* <Modal>
        <ReviewApplication />
      </Modal> */}
      <div className="mt-4 text-center">
        <Link to={`/view/complete/${id}`}
         className="text-blue-500 font-semibold ">View Application</Link></div>
      <br></br>
      <CommentBox onAccept={auditOnAccept} onReview={auditOnReview} />
      </div>
    </>
    
  )
}
