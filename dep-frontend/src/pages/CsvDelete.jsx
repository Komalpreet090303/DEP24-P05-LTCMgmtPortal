import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Form from "../components/Form";
import Input from "../components/Input";

const CsvDelete = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [email, setemail] = useState();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleRes = (res) => {
    if (res.status == 200) {
      toast.success("User Deleted Successfully");
      // window.location.reload();
    } else {
      toast.error("Error ");
    }
  };

  const AdminDeleteHandler = (e) => {
    const formData = {};

    formData["Email"] = email;
    if(!email)
    {
      return;
    }
    let fd = new FormData();
    fd.append("json", JSON.stringify(formData));

    console.log(formData);
    fetch("/api/deleteuser", {
      method: "POST",
      body: fd,
    }).then(handleRes);
  };
  const handleUpload = () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("/api/deleteusercsv", formData)
      .then((response) => {
        toast.success(response.data);
      })
      .catch((error) => {
        toast.error("Error uploading file.");
        console.error("Upload error:", error);
      });
  };

  return (
    <div className=" bg-[url('../../About_IIT_Ropar_banner_d0c869852d.webp')] bg-cover bg-center h-screen overflow-auto">
    <div className="max-w-screen-xl mx-auto ">
      <div className="flex justify-center">
        <Form onSubmit={AdminDeleteHandler}>
          <div className="m-4 grid gap-6 mb-1 md:grid-cols-2">
            <Input
              label={"Email"}
              iscompulsory={true}
              name="Email"
              type="text"
              onChange={(e) => setemail(e.target.value)}
            />
            <div className="flex justify-center">
              <Input
                className=" text-white bg-blue-700 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 mr-2 mb-2"
                type="submit"
              />
            </div>
          </div>
        </Form>
      </div>
      <div className="flex justify-center">
        <p>
          <h3>Or</h3>
        </p>
      </div>

      <div className="mt-8 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Upload CSV File to delete users{" "}
          <span className="text-red-500">*</span>
        </h2>
        <div className="mb-4">
          <p className="text-sm text-gray-500 max-w-sm">
            Enter the emailIds of users to be deleted in one column
          </p>
        </div>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Upload
        </button>
        {message && <p className="text-sm text-gray-500 mt-2">{message}</p>}
      </div>
    </div>
    </div>
  );
};

export default CsvDelete;
