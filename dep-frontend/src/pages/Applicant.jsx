import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../ApplicantPage.css";
import { LoginContext } from "../LoginContext";
import DescriptionIcon from "@mui/icons-material/Description";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

const Applicant = () => {
  const [user, setUser] = useContext(LoginContext);

  // bg-[url('../../public/Leave_Travel_Concession_and_Its_FAQs-02.webp')] bg-cover
  return (
    <div className="h-screen overflow-auto flex flex-col justify-between py-2 px-4 sm:px-6 lg:px-8 bg-[url('../../About_IIT_Ropar_banner_d0c869852d.webp')] bg-center bg-cover">
      {/* <div className="max-w-2xl mx-auto"> */}
      <div className="text-center">
        <h2
          className="font-mono text-3xl font-semibold mb-4 mt-5"
          style={{ fontFamily: "mono" }}
        >
          <span className="text-zinc-500" style={{ fontWeight: 100 }}>
            Hello,{" "}
          </span>
          <span className="text-zinc-700" style={{ fontWeight: 600 }}>
            {user.firstName} {user.lastName}!
          </span>
          <span className="text-zinc-500" style={{ fontWeight: 100 }}>
            &nbsp;&nbsp;&nbsp;&nbsp;Welcome to{" "}
          </span>
          <span className="text-zinc-700" style={{ fontWeight: 600 }}>
            LTC Portal IIT Ropar
          </span>
        </h2>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex flex-row mt-5 justify-center">
          <div className="flex flex-col" style={{ fontFamily: "mono" }}>
            <div className="grid grid-cols-5 border-r-2 border-l-2 border-t-2 border-b-2 w-72 h-24">
              <div className="col-span-1 bg-zinc-600">
                <DescriptionIcon
                  className="text-white mt-6 ml-2 hover:cursor-pointer"
                  style={{ height: 40, width: 40 }}
                />
              </div>
              <div className="col-span-4 bg-white text-center">
                <Link
                  to="/applicant/new"
                  className="font-bold  text-lg underline underline-offset-2 hover:no-underline hover:cursor-pointer"
                >
                  New LTC
                </Link>
                <p className="ml-2 font-sm text-slate-600">
                  Submit a new Leave Travel Concession application
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-5 border-r-2 border-l-2 border-t-2 border-b-2  w-72 h-24">
              <div className="col-span-1 bg-zinc-600">
                <PendingActionsIcon
                  className="text-white mt-6 ml-2 hover:cursor-pointer"
                  style={{ height: 40, width: 40 }}
                />
              </div>
              <div className="col-span-4 bg-white text-center">
                <Link
                  to="/applicant/live"
                  className="font-bold  text-lg underline underline-offset-2 hover:no-underline hover:cursor-pointer"
                >
                  Live LTC
                </Link>
                <p className="ml-2 font-sm text-slate-600">
                  Track the status of your Leave Travel Concession applications
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-5 border-r-2 border-l-2 border-t-2 border-b-2 w-72 h-24">
              <div className="col-span-1 bg-zinc-600">
                <DescriptionIcon
                  className="text-white mt-6 ml-2 hover:cursor-pointer"
                  style={{ height: 40, width: 40 }}
                />
              </div>
              <div className="col-span-4 bg-white text-center">
                <Link
                  to="/applicant/newTa"
                  className="font-bold text-lg underline underline-offset-2 hover:no-underline hover:cursor-pointer"
                >
                  New TA
                </Link>
                <p className="ml-2 font-sm text-slate-600">
                  Submit a new Travel Allowance application
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-5 border-r-2 border-l-2 border-t-2 border-b-2 w-72 h-24">
              <div className="col-span-1 bg-zinc-600">
                <PendingActionsIcon
                  className="text-white mt-6 ml-2 hover:cursor-pointer"
                  style={{ height: 40, width: 40 }}
                />
              </div>
              <div className="col-span-4 bg-white text-center">
                <Link
                  to="/applicant/liveTa"
                  className="font-bold  text-lg underline underline-offset-2 hover:no-underline hover:cursor-pointer"
                >
                  Live LTC
                </Link>
                <p className="ml-2 font-sm text-slate-600">
                  Track the status of your Travel Allowance applications
                </p>
              </div>
            </div>
          </div>
         
          <div className="ml-20 w-1/2 bg-[url('../../Leave-Travel-Concession-Travel-Cash-Voucher-Scheme-Taxscan.jpg')] bg-cover bg-center hover:bg-blend-overlay "></div>
        </div>
        {/* <div
          className="flex flex-col ml-44 mr-44 justify-center mt-5 bg-slate-500 border-r-2 border-l-2 border-t-2 border-b-2 rounded"
          style={{ fontFamily: "mono" }}
        > */}
         <div className="flex flex-row mt-16 justify-center "style={{ fontFamily: "mono" }}>
          <div className="flex flex-col justify-center pl-2 pr-2 border-r-2 border-l-2 border-t-2 border-b-2 rounded  w-3/4 hover:cursor-pointer hover:shadow-lg hover:shadow-white "style={{background:'#cccbb1'}}>
          <h3 className="text-2xl font-semibold mb-2">Key Features:</h3>
          <ul className="text-lg list-disc pl-4"style={{ fontFamily: "mono" }}>
            <li className="mb-2">
              Streamlined application process for easy submission.
            </li>
            <li className="mb-2">
              Real-time status updates on your Leave Travel Concession
              applications. Stay informed at every step.
            </li>
            <li className="mb-2">
              Efficient approval workflow, including Head of Department (HOD)
              approvals.
            </li>
            <li className="mb-2">
              Simple submission and tracking of Leave Travel Allowance (LTA)
              details.
            </li>
            <li>
              Detailed history of past applications and LTAs for reference.
              Access your travel history effortlessly.
            </li>
          </ul>
          </div>
        </div>
      </div>
      {/* </div> */}

      {/* <div className="max-w-4xl mx-auto"> */}
      {/* <section className="text-gray-700">
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-4">
              Hello, {user.firstName} {user.lastName}!
            </h2>
            <p className="text-lg mb-8">
              Welcome to our Leave Travel Concession application portal. Here's
              how you can make the most of it:
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">How to Use:</h3>
            <ol className="list-decimal pl-4">
              <li className="mb-2">
                Click on the{" "}
                <Link
                  to="/applicant/new"
                  className="text-blue-500 font-bold hover:underline"
                >
                  New LTC Application
                </Link>{" "}
                tab to submit a new Leave Travel Concession application.
              </li>
              <li className="mb-2">
                Fill in the required details, including travel dates,
                destination, and purpose. Be sure to provide accurate
                information.
              </li>
              <li className="mb-2">
                Submit your application and track its status in real-time under
                the{" "}
                <Link
                  to="/applicant/live"
                  className="text-blue-500 font-bold hover:underline"
                >
                  Live LTC Application
                </Link>{" "}
                section.
              </li>
              <li className="mb-2">
                Your application will move through different stages for
                approvals.
              </li>
              <li className="mb-2">
                Once approved, you can submit your Leave Travel Allowance (LTA)
                details under the{" "}
                <Link
                  to="/applicant/newTa"
                  className="text-blue-500 font-bold hover:underline"
                >
                  New TA Application
                </Link>{" "}
                tab.
              </li>
              <li>
                Monitor the status and history of your LTAs in the{" "}
                <Link
                  to="/applicant/liveTa"
                  className="text-blue-500 font-bold hover:underline"
                >
                  Live TA Application
                </Link>{" "}
                section.
              </li>
            </ol>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-2">Key Features:</h3>
            <ul className="list-disc pl-4">
              <li className="mb-2">
                Streamlined application process for easy submission.
              </li>
              <li className="mb-2">
                Real-time status updates on your Leave Travel Concession
                applications. Stay informed at every step.
              </li>
              <li className="mb-2">
                Efficient approval workflow, including Head of Department
                (HOD) approvals.
              </li>
              <li className="mb-2">
                Simple submission and tracking of Leave Travel Allowance (LTA)
                details.
              </li>
              <li>
                Detailed history of past applications and LTAs for reference.
                Access your travel history effortlessly.
              </li>
            </ul>
          </div>
        </section>
      </div> */}

      <footer className="text-black font-bold text-center mt-8">
        <p>&copy; 2024 Leave Travel Concession App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Applicant;
