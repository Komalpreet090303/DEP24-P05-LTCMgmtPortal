import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { LoginContext } from "../LoginContext";
import { stringify } from "postcss";
import Form from "../components/Form";
import Input from "../components/Input";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function formatDate(date) {
  return new Date(date).toISOString().substring(0, 10);
}

export default function OfficiatingDetails() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(LoginContext);
  const [email, setemail] = useState();
  const [startdate, setstartdate] = useState();
  const [enddate, setenddate] = useState();

  const handleRes = (res) => {
    if (res.status == 200) {
      toast.success("Officiating HOD set");
      navigate('/landing')
    } else {
      toast("Error");
    }
  };

  const HodSubmitHandler = (e) => {
    const formData = {};

    formData["Email"] = email;
    formData["startdate"] = startdate;
    formData["enddate"] = enddate;
    // a =
    let fd = new FormData();
    fd.append("json", JSON.stringify(formData));

    console.log(formData);
    fetch("/api/officiatinghod", {
      method: "POST",
      body: fd,
    }).then(handleRes);
  };

  return (
    // <div>{JSON.stringify(user)}</div>
    <div className="max-w-screen-xl mx-auto ">
      <Form onSubmit={HodSubmitHandler}>
        <div className="m-4 grid gap-6 mb-1 md:grid-cols-2 xl:grid-cols-4">
          <Input
            label={"Email"}
            iscompulsory={true}
            name="Email"
            type="text"
            onChange={(e) => setemail(e.target.value)}
          />
          <Input
            label={"Leave Start Date"}
            iscompulsory={true}
            name="Leave Start Date"
            type="date"
            onChange={(e) => setstartdate(e.target.value)}
          />
          <Input
            label={"Leave End Date"}
            iscompulsory={true}
            name="Leave End Date"
            type="date"
            onChange={(e) => setenddate(e.target.value)}
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
      </div>
    </div>
  );
}
