import Form from "../components/Form.jsx";
import InputGroup from "../components/InputGroup.jsx";
import Input from "../components/Input.jsx";
import Table from "../components/Table.jsx";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { LoginContext } from "../LoginContext.jsx";

export default function NewApplication() {

    const ChangeHandler = (e) => {
        
    } 
  return (
    <div className="bg-yellow-50 h-screen overflow-auto">
      <div className="max-w-screen-xl mx-auto">
        <h3 className="font-semibold text-xl text-gray-900 p-4 flex mx-auto">
          New Application
        </h3>
        <Form onsubmit={ChangeHandler}>

        </Form>
      </div>
    </div>
  );
}
