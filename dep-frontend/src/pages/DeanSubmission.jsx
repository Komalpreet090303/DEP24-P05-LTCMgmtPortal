import React from 'react'
import CommentBox from "../components/CommentBox.jsx"
import Modal from '../components/Modal.jsx'
import ReviewApplication from './ReviewApplication.jsx'
import { useNavigate,useParams} from "react-router";
import { toast } from "react-hot-toast";
import {Link} from "react-router-dom"

export default function DeanSubmission() {

  const { id } =useParams();
  const navigate = useNavigate();


  const handleDeanResponse = (res) => {
    if (res.status == 200) {
      navigate("/dean/pending");
    } else {
      toast("You are not authorized");
    }
  };


  const deanOnAccept = (e) => {
    const deanData = {};
    const status = "ACCEPT";
    const deanComment = document.querySelector('[name="comment"]');
    deanData["comment"] = deanComment.value;
    deanData["status"] = status;
    deanData["formId"] = id;


    fetch("/api/submitDeanData", {
      method: "POST",
      body: JSON.stringify(deanData),
      headers : {
        'Content-Type': 'application/json'
     },
    }).then(handleDeanResponse);

  };

  const deanOnReview = (e) => {
    const deanData = {};
    const status = "REVIEW";
    const deanComment = document.querySelector('[name="comment"]');
    deanData["comment"] = deanComment.value;
    deanData["status"] = status;
    deanData["formId"] = id;

    if(deanComment.value === "")
    {
      toast.error("Please Comment the reason for rejection",{
        duration: 3000,
      }) 
      return
    }
    fetch("/api/submitDeanData", {
      method: "POST",
      body: JSON.stringify(deanData),
      headers : {
        'Content-Type': 'application/json'
     },
    }).then(handleDeanResponse);

  };

  return (
    <div className='max-w-screen-xl mx-auto mt-4'>
    {/* <Modal>
        <ReviewApplication />
      </Modal> */}
      <div className="mt-4 text-center">
        <Link to={`/view/complete/${id}`}
         className="text-blue-500 font-semibold ">View Application</Link></div>
      <CommentBox onAccept={deanOnAccept} onReview={deanOnReview}  />
    </div>
    
  )
}
