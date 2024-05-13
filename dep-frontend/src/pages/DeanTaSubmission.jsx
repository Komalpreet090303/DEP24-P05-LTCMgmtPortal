import React from 'react'
import CommentBox from "../components/CommentBox.jsx"
import Modal from '../components/Modal.jsx'
import ReviewTaApplication from './ReviewTaApplication.jsx'
import { useNavigate,useParams} from "react-router";
import { toast } from "react-hot-toast";
import {Link} from "react-router-dom"

export default function DeanTaSubmission() {

  const { id } =useParams();
  const navigate = useNavigate();


  const handleDeanTaResponse = (res) => {
    if (res.status == 200) {
      navigate("/dean/pendingTa");
    } else {
      toast("You are not authorized");
    }
  };


  const deanOnTaAccept = (e) => {
    const deanTaData = {};
    const status = "ACCEPT";
    const deanTaComment = document.querySelector('[name="comment"]');
    deanTaData["comment"] = deanTaComment.value;
    deanTaData["status"] = status;
    deanTaData["formId"] = id;


    fetch("/api/submitTADeanData", {
      method: "POST",
      body: JSON.stringify(deanTaData),
      headers : {
        'Content-Type': 'application/json'
     },
    }).then(handleDeanTaResponse);

  };

  const deanOnTaReview = (e) => {
    const deanTaData = {};
    const status = "REVIEW";
    const deanTaComment = document.querySelector('[name="comment"]');
    deanTaData["comment"] = deanTaComment.value;
    deanTaData["status"] = status;
    deanTaData["formId"] = id;

    if(deanTaComment.value === "")
    {
      toast.error("Please Comment the reason for rejection",{
        duration: 3000,
      }) 
      return
    }
    fetch("/api/submitTADeanData", {
      method: "POST",
      body: JSON.stringify(deanTaData),
      headers : {
        'Content-Type': 'application/json'
     },
    }).then(handleDeanTaResponse);

  };

  return (
    <div className='max-w-screen-xl mx-auto mt-4'>
    {/* <Modal>
        <ReviewTaApplication />
      </Modal> */}
      <div className="mt-4 text-center">
        <Link to={`/view/completeta/${id}`}
         className="text-blue-500 font-semibold">View Application</Link></div>
      <CommentBox  onAccept={deanOnTaAccept} onReview={deanOnTaReview}   />
    </div>
    
  )
}
