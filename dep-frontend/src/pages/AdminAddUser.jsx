import React from "react";
import { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import { LoginContext } from "../LoginContext";
import { stringify } from "postcss";
import Form from "../components/Form";
import Input from "../components/Input";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import CsvUpload from "./CsvUpload";

function formatDate(date) {
  return new Date(date).toISOString().substring(0, 10);
}

export default function AdminAddUser() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(LoginContext);
  const [email, setemail] = useState();
  const [first, setfirst] = useState();
  const [last, setlast] = useState();
  const [des, setdes] = useState();
  const [pay, setpay] = useState();
  const [dateset, setdateset] = useState();
  const [Department, setdepartment] = useState();
  const [home, sethome] = useState();
  const [roleid, setroleid] = useState();

  const handleRes = (res) => {
    if (res.status == 200) {
      toast("User Added");
      navigate("/admin/userdisplay");
    } else {
      toast("Error");
    }
  };

  const AdminSubmitHandler = (e) => {
    const formData = {};

    formData["Email"] = email;
    formData["First Name"] = first;
    formData["Last Name"] = last;
    formData["Designation"] = des;
    formData["Pay Level"] = pay;
    formData["Date Of Joining"] = dateset;
    formData["Department"] = Department;
    formData["Hometown"] = home;
    formData["roleId"] = roleid;
    // a =
    let fd = new FormData();
    fd.append("json", JSON.stringify(formData));

    console.log(formData);
    fetch("/api/newuser", {
      method: "POST",
      body: fd,
    }).then(handleRes);
  };

  return (
    // <div>{JSON.stringify(user)}</div>
    <div className="bg-[url('../../About_IIT_Ropar_banner_d0c869852d.webp')] bg-cover bg-center h-screen overflow-auto ">
    <div className="max-w-screen-xl mx-auto ">
      <Form onSubmit={AdminSubmitHandler}>
        <div className="m-4 grid gap-6 mb-1 md:grid-cols-2 xl:grid-cols-4">
          <Input
            label={"Email"}
            iscompulsory={true}
            name="Email"
            type="text"
            onChange={(e) => setemail(e.target.value)}
          />
          <Input
            label={"First Name"}
            iscompulsory={true}
            name="First Name"
            type="text"
            onChange={(e) => setfirst(e.target.value)}
          />
          <Input
            label={"Last Name"}
            iscompulsory={true}
            name="Last Name"
            type="text"
            onChange={(e) => setlast(e.target.value)}
          />
          <Input
            label={"Designation"}
            iscompulsory={true}
            name="Designation"
            type="text"
            onChange={(e) => setdes(e.target.value)}
          />
          <Input
            label={"Pay Level"}
            iscompulsory={true}
            name="Pay Level"
            type="int"
            onChange={(e) => setpay(e.target.value)}
          />
          <Input
            label={"Date Of Joining"}
            iscompulsory={true}
            name="Date of Joining"
            type="date"
            onChange={(e) => setdateset(e.target.value)}
          />
          <Input
            label={"Department"}
            iscompulsory={true}
            name="Department"
            type="text"
            onChange={(e) => setdepartment(e.target.value)}
          />
          <Input
            label={"Hometown"}
            iscompulsory={true}
            name="Hometown"
            type="text"
            onChange={(e) => sethome(e.target.value)}
          />
          <Input
            label={"Role Id"}
            iscompulsory={true}
            name="Role ID"
            type="int"
            onChange={(e) => setroleid(e.target.value)}
          />
          <div className="flex justify-center">
            <Input
              className=" text-white bg-blue-700 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 mr-2 mb-2"
              type="submit"
            />
          </div>
        </div>
      </Form>
      <div className="flex justify-center">
      <p>
        <h3>Or</h3>
      </p>
      </div>
      <CsvUpload></CsvUpload>
    </div>
    </div>
  );
}
