import React, { useState, useEffect, useRef } from "react";
import Form from "../components/Form.jsx";
import Input from "../components/Input.jsx";
import { LoginContext } from "../LoginContext.jsx";
import { useContext } from "react";
import { toast } from "react-hot-toast"


export default function Login() {
  const [userInfo, setUserInfo] = useContext(LoginContext);
  const dialogRef = useRef();
  const [resendEnabled, setResendEnabled] = useState(null);
  const [email, setEmail] = useState(""); // State to store the email address

  useEffect(() => {
    let timer = null;

    if (resendEnabled !== null && resendEnabled > 0) {
      timer = setTimeout(() => {
        setResendEnabled((prevTime) => prevTime - 1);
      }, 1000);
    } else if (resendEnabled === 0) {
      setResendEnabled(null);
    }

    return () => clearTimeout(timer);
  }, [resendEnabled]);

  const showOTPModal = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.elements[0].value;
    setEmail(email);
    // if(email=="riteshpatil1603@gmail.com" || email=="2021csb1120@iitrpr.ac.in")
    // {

    // }
    var formdata = new FormData();
    formdata.append("emailId", email);
    console.log(email);
    let res;
    res = await fetch("/api/login", {
      method: "POST",
      body: formdata,
    });
    if (res.status != 200) {
      const errorText = await res.text();
      toast.error(errorText);
    } else {
      dialogRef.current.show();
      setResendEnabled(30); // Start the 30-second countdown
    }
  };

  const checkOTP = async (e) => {
    e.preventDefault();
    const form = e.target;
    const otp = form.elements[0].value;
    var formdata = new FormData();
    formdata.append("otp", otp);
    let res = await fetch("/api/acceptOTP", {
      method: "POST",
      body: formdata,
    });
    // .then(async res => {
    //   if(res.status != 200) {
    //     console.error((await res.text()))
    //     return null
    //   }
    //   return res.json()
    // }).then(setUserInfo)
    if (res.status != 200) {
      let errorText = await res.text();
      toast.error(errorText);
    } else {
      setUserInfo(await res.json());
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      toast.error("Email address not found.");
      return;
    }
    var formdata = new FormData();
    formdata.append("emailId", email);
    console.log(email);
    let res;
    res = await fetch("/api/login", {
      method: "POST",
      body: formdata,
    });
    if (res.status != 200) {
      const errorText = await res.text();
      toast.error(errorText);
      dialogRef.current.show();
    } else {
      toast.success("OTP has been resent");
      dialogRef.current.show();
      setResendEnabled(30); // Start the 30-second countdown
    }
    console.log("Resend OTP to:", email);
    // Add logic to resend OTP here using the stored email address
    // dialogRef.current.show();
    setResendEnabled(30); // Start the 30-second countdown
  };

  return (  
    <>
      <header className="applicant-header">
        <h1>Leave Travel Concession Portal IIT Ropar</h1>
      </header>
      <section className="h-screen bg-yellow-50 bg-[url('../../About_IIT_Ropar_banner_d0c869852d.webp')] bg-cover bg-center dark:bg-gray-900 relative">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="mt-10 w-full bg-white rounded-lg shadow dark:border md:mt-0 mb-2 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                LTC Management Portal
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={showOTPModal}>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    {/* <div className="flex items-center h-5"> */}
                      {/* <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div> */}
                    {/* <div className="ml-3 text-sm">
                      <label
                        for="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div> */}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
        <dialog
          className="w-[28rem] rounded-lg p-32  top-[10%] bg-white border-2 border-gray-300 "
          ref={dialogRef}
        >
          <div>
            <div>Enter OTP:</div>
            <form onSubmit={checkOTP}>
              <input
                type="number"
                name="otp"
                id="otp"
                className=" my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="****"
                required=""
              />
              <div className="flex items-center justify-between">
                <div className="flex items-start"></div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </form>
            {/* Resend OTP Button and Timer */}
            {resendEnabled !== null ? (
              <div className="flex items-center nowrap row justify-center space-x-2">
                <p className="mt-5">
                  Resend OTP in{" "}
                  {`00:${
                    resendEnabled < 10 ? `0${resendEnabled}` : resendEnabled
                  }`}
                </p>
              </div>
            ) : (
              <button
                onClick={handleResendOTP}
                className="w-full text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5"
              >
                Resend OTP
              </button>
            )}
          </div>
        </dialog>
      </section>
    </>
  );
}
