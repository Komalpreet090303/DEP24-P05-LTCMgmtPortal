import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ViewUser() {
  const [userData, setUserData] = useState(null);
  const [newPayLevel, setNewPayLevel] = useState("");
  const { email } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(email);
    const fetchUserByEmail = async () => {
      try {
        const response = await axios.post("/api/getUserByEmail", { email });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserByEmail();
  }, [email]);

  const handleUpdatePayLevel = async () => {
    try {
      if(newPayLevel === "")
      {
        return;
      }
      const response = await axios.post("/api/updatePayLevel", {
        email,
        newPayLevel,
      });
      setUserData((prevUserData) => ({
        ...prevUserData,
        payLevel: response.data.payLevel,
      }));
      setNewPayLevel("");
      toast.success("Paylevel Updated Successfully")
      navigate('/admin/userdisplay')
    } catch (error) {
      toast.error("Error updating pay level:", error);
    }
  };

  return (

    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-6">User Details</h1>
      {userData ? (
        <div>
          <div className="mb-4">
            <span className="font-semibold mr-2">Name:</span>
            {userData.firstName} {userData.lastName}
          </div>
          <div className="mb-4">
            <span className="font-semibold mr-2">Email:</span>
            {userData.emailId}
          </div>
          <div className="mb-4">
            <span className="font-semibold mr-2">Department:</span>
            {userData.department}
          </div>
          <div className="mb-4">
            <span className="font-semibold mr-2">Designation:</span>
            {userData.designation}
          </div>
          <div className="mb-4">
            <span className="font-semibold mr-2">Hometown:</span>
            {userData.hometown}
          </div>
          <div className="mb-4">
            <span className="font-semibold mr-2">Pay Level:</span>
            {userData.paylevel}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="border border-gray-300 rounded px-2 py-1"
              placeholder="New Pay Level"
              value={newPayLevel}
              onChange={(e) => setNewPayLevel(e.target.value)}
            />
            <button
              className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
              onClick={handleUpdatePayLevel}
            >
              Update Pay Level
            </button>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default ViewUser;
