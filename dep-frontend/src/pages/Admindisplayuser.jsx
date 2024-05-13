import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledUserDisplay = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h1 {
    text-align: center;
    color: #333;
  }

  .search-container {
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    .search-input {
      flex: 1;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .search-button {
      margin-left: 10px;
      padding: 8px 16px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      background-color: #f4f4f4;
      margin: 10px 0;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:hover {
        background-color: #e0e0e0;
      }

      .user-info {
        flex: 1;

        span {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        .email {
          color: #555;
        }
      }

      .view-button {
        padding: 8px 16px;
        background-color: #28a745;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background-color: #218838;
        }
      }
    }
  }
`;

function AdminDisplayUser() {
  const [users, setUsers] = useState([]);
  const [usersshow, setshowusers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  async function fetchUsers() {
    try {
      const response = await axios.get("/api/displayUsers");
      setUsers(response.data);
      setshowusers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  // useEffect(() => {
  //   const setBodyHeight = () => {
  //     document.body.style.height = `${window.innerHeight}px`;
  //   };

  //   setBodyHeight();

  //   window.addEventListener("resize", setBodyHeight);
  //   return () => {
  //     window.removeEventListener("resize", setBodyHeight);
  //   };
  // }, [selectedRole]);


  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [selectedRole, searchQuery]);

  const handleSearch = () => {
    // if (searchQuery.trim() == "" && (selectedRole === "14" || selectedRole === "")) {
    //   console.log("hey");
    //   // try {
    //   //   const response = await axios.get("/api/displayUsers");
    //   //   console.log(response.data)
    //   //   setUsers(response.data);
    //   //   console.log(users);
    //   // } catch (error) {
    //   //   console.error("Error fetching users:", error);
    //   // }
    //   fetchUsers();
    // }
    // else{
    // setshowusers(users);
    // console.log(users);

    let filteredUsers = [...users];

    // console.log(users[0].roleId)

    if (selectedRole) {
      console.log(selectedRole);
      if (selectedRole != "14") {
        console.log("trip");
        console.log(selectedRole);
        const role = parseInt(selectedRole);
        filteredUsers = filteredUsers.filter((user) => user.roleId === role);
      }
    }

    if (searchQuery.trim() !== "") {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.emailId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    console.log(filteredUsers);
    setshowusers(filteredUsers);
    console.log(users);
    // }
  };

  const handleRoleChange = (e) => {
    const roleId = e.target.value;
    setSelectedRole(roleId);
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);
    handleSearch();
  };

  return (
    <div className="bg-indigo-300 h-screen overflow-auto">
      <StyledUserDisplay>
      <h1 className="text-center text-gray-800 text-2xl font-bold mb-4">User List</h1>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleChange}
          />
          {/* <select
            className="role-select"
            onChange={handleRoleChange}
            value={selectedRole}
          > */}
          <select
            className="appearance-none border border-gray-300 rounded py-2 px-4 ml-2 mr-2 leading-tight focus:outline-none"
            onChange={handleRoleChange}
            value={selectedRole}
          >
            <option value="">Select Role</option>
            <option value="14">All</option>
            <option value="0">Applicant</option>
            <option value="1">HOD</option>
            <option value="2">Establishment Jr. Assistant</option>
            <option value="3">Establishment Superintendent</option>
            <option value="4">Establishment DR</option>
            <option value="5">Accounts JAA</option>
            <option value="6">Accounts AO</option>
            <option value="7">Accounts DR</option>
            <option value="8">Audit DA</option>
            <option value="9">Audit AO</option>
            <option value="10">Sr. Audit Officer</option>
            <option value="11">Registrar</option>
            <option value="12">Dean</option>
            <option value="13">Admin</option>

            {/* Add more options as needed */}
          </select>
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        <ul>
          {usersshow.map((user) => (
            <li key={user.id}>
              <div className="user-info">
                <span>
                  {user.firstName} {user.lastName}
                </span>
                <span className="email">{user.emailId}</span>
              </div>
              <Link to={`/admin/userdisplay1/view-user/${user.emailId}`}>
                <button className="view-button">View</button>
              </Link>
            </li>
          ))}
        </ul>
      </StyledUserDisplay>
    </div>
  );
}

export default AdminDisplayUser;
