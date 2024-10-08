import React from "react";
import CommentBox from "../components/CommentBox.jsx";
import Modal from "../components/Modal.jsx";
import ReviewTaApplication from "./ReviewTaApplication.jsx";
import { useNavigate,useParams} from "react-router";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function RegistrarTaSubmission() {

  const { id } =useParams();
  const navigate = useNavigate();


  const handleRegistrarTaResponse = (res) => {
    if (res.status == 200) {
      navigate("/registrar/pendingTa");
    } else {
      toast("You are not authorized");
    }
  };


  const registrarOnTaAccept = (e) => {
    const registrarTaData = {};
    const status = "ACCEPT";
    const registrarTaComment = document.querySelector('[name="comment"]');
    registrarTaData["comment"] = registrarTaComment.value;
    registrarTaData["status"] = status;
    registrarTaData["formId"] = id;


    fetch("/api/submitTARegistrarData", {
      method: "POST",
      body: JSON.stringify(registrarTaData),
      headers : {
        'Content-Type': 'application/json'
     },
    }).then(handleRegistrarTaResponse);

  };

  const registrarOnTaReview = (e) => {
    const registrarTaData = {};
    const status = "REVIEW";
    const registrarTaComment = document.querySelector('[name="comment"]');
    registrarTaData["comment"] = registrarTaComment.value;
    registrarTaData["status"] = status;
    registrarTaData["formId"] = id;

    if(registrarTaComment.value === "")
    {
      toast.error("Please Comment the reason for rejection",{
        duration: 3000,
      }) 
      return;
    }

    fetch("/api/submitTARegistrarData", {
      method: "POST",
      body: JSON.stringify(registrarTaData),
      headers : {
        'Content-Type': 'application/json'
     },
    }).then(handleRegistrarTaResponse);

  };

  return (
    <div className='max-w-screen-xl mx-auto mt-4'>
      {/* <Modal>
        <ReviewTaApplication />
      </Modal> */}
      <div className="mt-4 text-center">
        <Link to={`/view/completeta/${id}`}
         className="text-blue-500 font-semibold ">View Application</Link></div>
      <CommentBox onAccept={registrarOnTaAccept} onReview={registrarOnTaReview}  />
    </div>
  );
}
