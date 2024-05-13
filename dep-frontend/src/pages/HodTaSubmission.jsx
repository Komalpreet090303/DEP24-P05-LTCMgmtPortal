import React from 'react'
import EstabTaTable from '../components/EstabTaTable'
import ReviewTaApplication from './ReviewTaApplication' 
import CommentBox from '../components/CommentBox'
import Modal from "../components/Modal";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form.jsx";
import { toast } from 'react-hot-toast';
import ListComment from '../components/ListComment';
import {Link} from "react-router-dom"

export default function HodTaSubmission() {

  const { id } = useParams();
  const navigate = useNavigate();
  const handleHodTaResponse = (res) => {
    if (res.status == 200) {
      navigate("/hod/pendingTa");
    } else {
      toast("You are not authorized");
    }
  };

  const hodOnTaAccept = (e) => {
    const hodTaData = {};
    const status = "ACCEPT";
    const hodTaComment = document.querySelector('[name="comment"]');
    hodTaData["comment"] = hodTaComment.value;
    hodTaData["status"] = status;
    hodTaData["formId"] = id;


    fetch("/api/submitTAHodData", {
      method: "POST",
      body: JSON.stringify(hodTaData),
      headers : {
        'Content-Type': 'application/json'
     },
    }).then(handleHodTaResponse);

  };

  const hodOnTaReview = (e) => {
    const hodTaData = {};
    const status = "REVIEW";
    const hodTaComment = document.querySelector('[name="comment"]');
    hodTaData["comment"] = hodTaComment.value;
    hodTaData["status"] = status;
    hodTaData["formId"] = id;
    // console.log(hodTaComment)
    if(hodTaComment.value === "")
    {
      toast.error("Please Comment the reason for rejection",{
        duration: 3000,
      }) 
      return;
    }

    fetch("/api/submitTAHodData", {
      method: "POST",
      body: JSON.stringify(hodTaData),
      headers : {
        'Content-Type': 'application/json'
     },
    }).then(handleHodTaResponse);

  };

  return (
    <div >

    <div className='max-w-screen-xl mx-auto pt-4'>
      {/* <Modal> */}
        {/* <ReviewTaApplication /> */}
        <div className="mt-4 text-center">
        <Link to={`/view/completeta/${id}`}
         className="text-blue-500 font-semibold ">View Application</Link></div>
      {/* </Modal> */}
      {/* <ListComment /> */}
      <CommentBox onAccept={hodOnTaAccept} onReview={hodOnTaReview}  />
    </div>
    </div>
  )
}
