import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../LoginContext";
import { useContext } from "react";
import ProfileAvatar from "./ProfileAvatar";
import Avatar from "@mui/material/Avatar";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import NotificationBar from "./NotificationBar";
import { toast } from "react-hot-toast";
import ProfileImage from "../../public/user.png";
import RoparImage from "../../public/Indian_Institute_of_Technology_Ropar_logo.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useContext(LoginContext);

  const stakeHolderType = [
    "applicant",
    "hod",
    "establish",
    "establish",
    "establish",
    "accounts",
    "accounts",
    "accounts",
    "audit",
    "audit",
    "audit",
    "registrar",
    "dean",
    "admin",
    "hod"
  ];

  useEffect(() => {
    setAvatar(false);
  }, [location]);

  const catMenu = useRef(null);

  const closeOpenMenus = (e) => {
    if (catMenu.current && avatar && !catMenu.current.contains(e.target)) {
      setAvatar(false);
    }
    setNotification(false);
  };

  document.addEventListener("mousedown", closeOpenMenus);

  const logoutHandle = () => {
    const handleStatus = (res) => {
      if (res.status === 200) setUser(null);
    };
    const logOUT_ = () => {
      setUser(null);
      navigate("/");
    };
    fetch("/api/logout", {
      method: "POST",
    }).then((res) =>
      res.status === 200 ? logOUT_() : toast("Failed to Logout")
    );
  };

  const [avatar, setAvatar] = useState(false);
  const [openNotification, setNotification] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Add mobileMenuOpen state variable
  const handleClick = () => setAvatar(!avatar);

  return (
    <>
      <div className="bg-[#0247FE] border-gray-200" ref={catMenu}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
          {/* Name + Logo */}
          <div className="flex items-center">
            <img className="h-12 mr-3" src={RoparImage} alt="IIT Ropar Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#EBF7D4]">
              LTC Portal
            </span>
          </div>

          {/* Small Screen */}
          <div className="flex items-center lg:order-2">
            <div className="mr-6 pt-1">
              <NotificationBar
                open={openNotification}
                setOpen={setNotification}
              />
            </div>

            <div
              onClick={handleClick}
              className="flex mr-3  rounded-full md:mr-0"
            >
              <Avatar sx={{ width: 32, height: 32, backgroundColor: "black" }}>
                <AccountCircleSharpIcon sx={{ color: "white" }} />
              </Avatar>
            </div>
            <div
              className={
                !avatar
                  ? "hidden"
                  : "absolute top-0 right-0 translate-y-10 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow"
              }
              id="user-dropdown"
            >
              <div class="px-4 py-3">
                <span className="block text-sm text-gray-700 ">{`${user.firstName} ${user.lastName}`}</span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {user.emailId}
                </span>
                {user.role.stageCurrent > 0 && (
                  <span> {user.designation} </span>
                )}
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <ProfileAvatar />
                </li>
                <li
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                  onClick={logoutHandle}
                >
                  <button> Logout </button>
                </li>
                <li>
                </li> 
              </ul>
            </div>
            <span className="ml-2 py-2 text-white">{user.designation}</span>
          </div>

          <div className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1">
            <div className="lg:hidden">
              <button
                className="mobile-menu-button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
            {
              <div
                className={
                  mobileMenuOpen ? "lg:block block" : "hidden lg:block"
                }
              >
                <ul className="lg:flex flex-wrap items-center space-x-4 lg:space-x-8 lg:ml-6">
                  {user.isAdmin ? (
                    <>
                      <li>
                        <Link
                          to={"/admin/userdisplay"}
                          className="block py-2 pl-7 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          Display User{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/admin/adduser"}
                          className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          Add User{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/admin/deleteuser"}
                          className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          Delete User by CSV{" "}
                        </Link>
                      </li>
                    </>
                  ) : user.isApplicant ? (
                    <>
                      <li>
                        <Link
                          to={"/applicant/new"}
                          className="block py-2 pl-7 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          New LTC{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/applicant/live"}
                          className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          Live LTC{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/applicant/newTa"}
                          className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          New TA{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/applicant/liveTa"}
                          className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          Live TA{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/applicant/officeOrder"}
                          className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          Office Orders{" "}
                        </Link>
                      </li>
                    </>
                  ) : user.roleId == 5 ||
                    user.roleId == 6 ||
                    user.roleId == 7 ? (
                    <>
                      <li>
                        <Link
                          to={`/${stakeHolderType[user.roleId]}/pending`}
                          className="block py-2 pl-7 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          Pending LTC{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/${stakeHolderType[user.roleId]}/pendingTa`}
                          className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          Pending TA{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/officeOrder"}
                          className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          Office Orders{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/approvedltc`}
                          className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          Approved LTC{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/approvedta`}
                          className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          Approved TA{" "}
                        </Link>
                      </li>
                    </>
                  ) : user.roleId==1 ?(
                    <>
                        <li>
                        <Link
                          to={`/${stakeHolderType[user.roleId]}/pending`}
                          className="block py-2 pl-7 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          Pending LTC{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/${stakeHolderType[user.roleId]}/pendingTa`}
                          className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          Pending TA{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/approvedltc`}
                          className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          Approved LTC{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/approvedTa`}
                          className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          Approved TA{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/hod/officiating/details`}
                          className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          Assign Officiating HOD{" "}
                        </Link>
                      </li>
                    </>
                  ) :(
                    <>
                      <li>
                        <Link
                          to={`/${stakeHolderType[user.roleId]}/pending`}
                          className="block py-2 pl-7 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          Pending LTC{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/${stakeHolderType[user.roleId]}/pendingTa`}
                          className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          Pending TA{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/approvedltc`}
                          className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          Approved LTC{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/approvedTa`}
                          className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                        >
                          Approved TA{" "}
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            }
          </div>
        </div>
      </div>

      <div className={mobileMenuOpen ? "block" : "hidden"}>
        <ul className="lg:flex flex-wrap items-center space-x-4 lg:space-x-8 lg:ml-6">
        </ul>
      </div>
    </>
  );
}
