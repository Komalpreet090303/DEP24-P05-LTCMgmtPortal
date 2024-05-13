// import Form from "../components/Form.jsx";
// import InputGroup from "../components/InputGroup.jsx";
// import Input from "../components/Input.jsx";
// import Table from "../components/Table.jsx";
// import { useState } from "react";
// import EstabSubmission from "./EstabSubmission.jsx";
// import AccountsSubmission from "./AccountsSubmission.jsx";
// import CommentBox from "../components/CommentBox.jsx";
// import { taInfo } from "../dummy/taInfos.js";
// import { useEffect, useRef } from "react";
// import { useParams } from "react-router";

// export default function ReviewTaApplication() {
//   const receiptRef = useRef(null);
//   const { id } = useParams();
//   const [taData, setTaData] = useState(taInfo[0]);
//   const [people, setPeople] = useState([]);
//   const [journey, setJourney] = useState([]);
//   console.log(taData);
//   const handleInfo = (json) => {
//     setTaData(json);
//     setPeople(json.ltcInfo.peopleInvolved);
//     for (let i = 0; i < json.journeyDetails.length; i++) {
//       json.journeyDetails[i]["departureDate"] = new Date(
//         json.journeyDetails[i]["departureDate"]
//       )
//         .toISOString()
//         .substring(0, 10);
//       json.journeyDetails[i]["arrivalDate"] = new Date(
//         json.journeyDetails[i]["arrivalDate"]
//       )
//         .toISOString()
//         .substring(0, 10);
//     }

//     setJourney(json.journeyDetails);
//     console.log("receipt Id");
//     for (let receiptId of json.receipts) {
//       console.log(receiptId);
//       addFile(receiptId);
//     }
//   };

//   const addFile = (id) => {
//     const formdata = new FormData();
//     formdata.append("fileId", id);
//     fetch("/api/getReceipt", {
//       method: "POST",
//       body: formdata,
//     }).then(handleBlob);
//   };

//   const handleBlob = async (res) => {
//     console.log(res);
//     if (res.status == 200) {
//       const blob = await res.blob();
//       console.log(blob);
//       const url = window.URL.createObjectURL(blob);
//       const li = document.createElement("li");
//       const a = document.createElement("a");
//       const textnode = document.createTextNode("Click to open in new tab file");
//       a.appendChild(textnode);
//       a.href = url;
//       a.target = "_blank";
//       li.appendChild(a);
//       receiptRef.current.appendChild(li);
//     }
//   };

//   useEffect(() => {
//     fetch("/api/getTAInfo", {
//       method: "POST",
//       body: JSON.stringify({ taId: id }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then(handleInfo);
//   }, []);

//   const totalFare = journey.reduce((total, item) => {
//     return total + item.totalFare;
//   }, 0);

//   return (
//     <>
//       <h3>New TA Application</h3>
//       <Form
//         onSubmit={() => {
//           /*
//               <form method="POST" action="/api/createNewApplication">

//               </form>
//               fetch('/api/createNewApplication', {
//                 method: "POST",
//                 data: JSON.stringify(people)
//               }).then(res => res.json()).then(json_data => handle(json_date))
//             */
//         }}
//       >
//         <InputGroup>
//           <div className=" grid gap-6 mt-4 mb-2 md:grid-cols-2 xl:grid-cols-4">
//             <Input
//               readOnly
//               label={"Name"}
//               name="name"
//               type="text"
//               value={taData.user.firstName + " " + taData.user.lastName}
//             />
//             <Input
//               readOnly
//               label={"Emp. Code"}
//               name="empCode"
//               type="number"
//               value={taData.user.id}
//             />
//             <Input
//               readOnly
//               label={"Pay Level"}
//               name="payLevel"
//               type="number"
//               value={taData.user.paylevel}
//             />
//             <Input
//               readOnly
//               label={"Designation"}
//               name="Designation"
//               type="text"
//               value={taData.user.designation}
//             />
//             <Input
//               readOnly
//               label={"Department"}
//               name="department"
//               type="text"
//               value={taData.user.department}
//             />

//             <Input
//               readOnly
//               label={"Date of Joining"}
//               name="date"
//               type="date"
//               value={new Date(taData.fillDate).toISOString().substring(0, 10)}
//             />
//           </div>
//           <h3 className="font-semibold text-l m-4 text-gray-900">
//             Leave Details
//           </h3>
//           {/* <Input label={"Earned Leave Availed"} name="earnedLeave" type="number" /> */}
//           <div className=" grid gap-6 mt-4 mb-2 md:grid-cols-2 xl:grid-cols-4">
//             <Input
//               readOnly
//               label={"From"}
//               name="leaveFrom"
//               type="date"
//               value={new Date(taData.ltcInfo.fromDate)
//                 .toISOString()
//                 .substring(0, 10)}
//             />
//             <Input
//               readOnly
//               label={"To"}
//               name="leaveTo"
//               type="date"
//               value={new Date(taData.ltcInfo.toDate)
//                 .toISOString()
//                 .substring(0, 10)}
//             />
//             {/* <h3>Prefix Details</h3>
//             <Input label={"From"} name="prefixFrom" type="date" />
//             <Input label={"To"} name="prefixTo" type="date" />
//             <h3>Suffix Details</h3>
//             <Input label={"From"} name="suffixFrom" type="date" />
//           <Input label={"To"} name="suffixTo" type="date" /> */}
//             {/* <Input
//               label={"Spouse Entitled for LTC"}
//               name="spouseEntitled"
//               type="checkbox"
//             /> */}
//             <Input
//               readOnly
//               label={"Advance Drawn"}
//               name="advanceDrawnAmount"
//               type="number"
//               value={taData.ltcInfo.advanceRequired}
//             />
//             <Input
//               readOnly
//               label={"Advance Drawn Date"}
//               name="advanceDrawnDate"
//               type="date"
//               value={
//                 taData.ltcInfo.advanceDrawnDate
//                   ? new Date(taData.ltcInfo.advanceDrawnDate)
//                       .toISOString()
//                       .substring(0, 10)
//                   : ""
//               }
//             />
//             {/* <Input label={"Home Town"} name="homeTown" type="text" /> */}
//             <Input
//               readOnly
//               label={"Bank Account No. (SBI/Any other):"}
//               name="accountNo"
//               type="number"
//               value={taData.accountNo ? taData.accountNo : ""}
//             />
//             {/* <Input
//               label={"Nature of Visiting Place"}
//               name="visitNature"
//               type="text"
//               />
//               <Input label={"Visiting Place"} name="visitPlace" type="text" />
//               <Input
//               label={"Total Estimated Fare"}
//               name="estimatedFare"
//               type="number"
//             /> */}
//           </div>
//         </InputGroup>

//         <InputGroup>
//           <h3 className="font-semibold text-l m-4 text-gray-900">
//             Particulars of the claimant and family in respect of whom the Leave
//             Travel Concession has been claimed:
//           </h3>
//           <Table
//             readOnly={true}
//             fields={[
//               { heading: "Name", type: "text" },
//               { heading: "Age", type: "number" },
//               { heading: "Relation", type: "text" },
//               // { heading: "From", type: "text" },
//               // { heading: "To", type: "text" },
//               // { heading: "Back", type: "checkbox" },
//               // { heading: "Mode Of Travel", type: "text" },
//             ]}
//             data={people}
//             setData={setPeople}
//           />
//           {/* <Input
//               label={"Advance Required"}
//               name="advanceRequired"
//               type="checkbox"
//             />
//             <h3>Details for Encashment of Earned Leave</h3>
//             <Input
//               label={"Encashment Required"}
//               name="encashment"
//               type="checkbox"
//             />
//             <Input label={"No. of Days"} name="encashmentDays" type="number" /> */}

//           <h3 className="font-semibold text-l m-4 text-gray-900">
//             Details of journey(s) performed by Government Employee and the
//             members of his/her family:
//           </h3>
//           <Table
//             readOnly={true}
//             fields={[
//               {
//                 heading: "Departure Date",
//                 type: "date",
//                 stateKey: "departureDate",
//               },
//               {
//                 heading: "Departure From",
//                 type: "text",
//                 stateKey: "departureFrom",
//               },
//               {
//                 heading: "Arrival Date",
//                 type: "date",
//                 stateKey: "arrivalDate",
//               },
//               { heading: "Arrival To", type: "text", stateKey: "arrivalTo" },
//               {
//                 heading: "Distance in Kms",
//                 type: "number",
//                 stateKey: "distance",
//               },
//               {
//                 heading: "Mode Of Travel",
//                 type: "text",
//                 stateKey: "modeOfTravel",
//               },
//               {
//                 heading: "Class of Travel",
//                 type: "text",
//                 stateKey: "classOfTravel",
//               },
//               {
//                 heading: "No. of Fares",
//                 type: "number",
//                 stateKey: "noOfFares",
//               },
//               {
//                 heading: "Total Fare Paid",
//                 type: "number",
//                 stateKey: "totalFare",
//               },
//               {
//                 heading: "Ticket No./PNR/Remarks",
//                 type: "text",
//                 stateKey: "ticketNo",
//               },
//             ]}
//             data={journey}
//             setData={setJourney}
//           />

//           <Input
//             readOnly
//             label={"Total"}
//             name="totalAmount"
//             type="number"
//             value={totalFare}
//           />
//           <div className="flex flex-row gap-4">
//             <p className="mt-4">
//               I have not submitted any other claim so far for leave travel
//               Concession in respect of myself or my family members in respect of
//               the block year{" "}
//             </p>
//             <Input
//               readOnly
//               className="mt-4 h-10"
//               name="blockYear"
//               type="number"
//               value={taData.blockYear}
//             />
//           </div>
//           <div className="flex flex-row gap-4">
//             <p className="mt-4">
//               The journey has been performed by me and my spouse with Family
//               members to the declared “Home Town” / Other than Home Town viz.{" "}
//             </p>
//             <Input
//               readOnly
//               className="mt-4 h-10"
//               name="OtherThanHometown"
//               type="text"
//               value={taData.OtherThanHometown}
//             />
//           </div>
//           <p className="mt-4">
//             Certified that my spouse for whom LTC is claimed by me is employed
//             in{"    "}
//             <span className="h-10 whitespace-nowrap font-medium bg-white">{`${taData.GovtOffice}`}</span>
//             {"    "}
//             name of the Govt Office/Public Sector undertaking /Corporation /Autonomous body etc. which provides Leave
//             Travel Concession facilities but he/she has nor preferred and will
//             not claim in this behalf to his/her employer.
//           </p>
//           {/* <Input
//               readOnly
//               name="GovtOffice"
//               type="text"
//               value={taData.GovtOffice}
//             /> */}
//           <h3 className="font-semibold text-l m-4 text-gray-900">
//             CERTIFIED THAT:
//           </h3>
//           <span>
//             The information, as given above is true to the best of my knowledge
//             and belief{" "}
//             <Input
//               name="certification"
//               type="checkbox"
//               checked={true}
//               readOnly
//             />
//           </span>

//           {/* <Input type="submit" /> */}
//         </InputGroup>
//         <div>
//           Proofs:
//           <ul ref={receiptRef}></ul>
//         </div>
//       </Form>
//       {/* <EstabSubmission /> */}
//       {/* <AccountsSubmission /> */}
//       {/* <CommentBox /> */}
//     </>
//   );
// }
import Form from "../components/Form.jsx";
import InputGroup from "../components/InputGroup.jsx";
import Input from "../components/Input.jsx";
import TableTaDownload from "../components/TableTaDownload.jsx";
import { useState } from "react";
import EstabSubmission from "./EstabSubmission.jsx";
import AccountsSubmission from "./AccountsSubmission.jsx";
import CommentBox from "../components/CommentBox.jsx";
import { taInfo } from "../dummy/taInfos.js";
import { FaDownload } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { ltcInfo } from "../dummy/ltcInfos.js";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function ReviewTaApplication() {
  const receiptRef = useRef(null);
  const { id } = useParams();
  const [taData, setTaData] = useState(taInfo[0]);
  const [people, setPeople] = useState([]);
  const [journey, setJourney] = useState([]);
  console.log(taData);
  const handleInfo = (json) => {
    setTaData(json);
    console.log(taData)
    setPeople(json.ltcInfo.peopleInvolved);
    for (let i = 0; i < json.journeyDetails.length; i++) {
      json.journeyDetails[i]["departureDate"] = new Date(
        json.journeyDetails[i]["departureDate"]
      )
        .toISOString()
        .substring(0, 10);
      json.journeyDetails[i]["arrivalDate"] = new Date(
        json.journeyDetails[i]["arrivalDate"]
      )
        .toISOString()
        .substring(0, 10);
    }

    setJourney(json.journeyDetails);
    console.log("receipt Id");
    for (let receiptId of json.receipts) {
      console.log(receiptId);
      addFile(receiptId);
    }
  };

  const addFile = (id) => {
    const formdata = new FormData();
    formdata.append("fileId", id);
    fetch("/api/getReceipt", {
      method: "POST",
      body: formdata,
    }).then(handleBlob);
  };

  const handleBlob = async (res) => {
    console.log(res);
    if (res.status == 200 ) {
      const blob = await res.blob();
      console.log(blob);
      const url = window.URL.createObjectURL(blob);
      // if (receiptRef.current && receiptRef.current.childNodes.length === 0) {
      receiptRef.current.innerHTML = "";
      const li = document.createElement("li");
      const a = document.createElement("a");
      const textnode = document.createTextNode("Click to open in new tab file");
      a.appendChild(textnode);
      a.href = url;
      a.target = "_blank";
      li.appendChild(a);
      console.log(receiptRef.current)
      receiptRef.current.appendChild(li);
      // }
    }
  };

  useEffect(() => {
    fetch("/api/getTAInfo", {
      method: "POST",
      body: JSON.stringify({ taId: id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(handleInfo);
  }, []);

  const totalFare = journey.reduce((total, item) => {
    return total + item.totalFare;
  }, 0);

  const saveLeave = () => {
    const pdf = new jsPDF("portrait", "pt", "a2");
    const input = document.getElementById("first-page");
    html2canvas(input, {
      letterRendering: 1,
      allowTaint: true,
      logging: true,
      useCORS: true,
    })
      //By option in function Crosspassing this  origin images will be rendered properly in the downloaded version of the PDF
      .then((canvas) => {
        // document.getElementById("leave-container-" + leave_id).parentNode.style.overflow = 'hidden';

        var imgData = canvas.toDataURL("image/png");
        // window.open(imgData, "toDataURL() image", "width=800, height=800");

        pdf.addImage(imgData, "JPEG", 100, 50);
        const filename = `TA_${id}.pdf`
        pdf.save(filename);
      });
  };

  return (
    <>
      <div>
        <div className="flex flex-col justify-center items-center overflow-y-auto">
          <div className="bg-white mb-4">
            <div className="flex justify-center pt-2">
              Download pdf{" "}
              <FaDownload
                style={{ cursor: "pointer", paddingLeft: "2px" }}
                onClick={() => saveLeave()}
              />
            </div>
            <div
              className="container"
              style={{ width: "1000px" }}
              id={"first-page"}
            >
              <br />
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ flex: "0 0 auto" }}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/f/f9/Indian_Institute_of_Technology_Ropar_logo.png"
                    width="150px"
                    height="150px"
                    style={{ float: "left" }}
                  />
                </div>
                <div style={{ flex: "1 1 auto", textAlign: "center" }}>
                  <h3>भारतीय प्रौद्योगिकी संस्थान रोपड़</h3>
                  <h3>INDIAN INSTITUTE OF TECHNOLOGY ROPAR</h3>
                  <p>
                    नंगल विभाग रूपनगर,पंजाब-140001 / Nangal Road, Rupnagar,
                    Punjab-140001
                  </p>
                  <p>दूरभाष/Tele:+91-1881-227088, फेक्स/Fax :+91-1881-223395</p>
                </div>
              </div>

              <hr />

              <div className="leave-details text-center">
                <div className="row leave-details-heading">
                  <div className="col-3"></div>
                  <div className="col-6 text-center">
                    <p className="mb-4 font-bold underline-offset-2">
                      APPLICATION FOR TRAVEL ALLOWANCE
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-4">
                  <div className="row py-2" style={{ border: "1px solid" }}>
                    <div
                      className="ml-2 border-r"
                      style={{ textAlign: "left" }}
                    >
                      Name of the Employee: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {taData.user.firstName + " " + taData.user.lastName}
                    </div>
                  </div>
                  <div className="row py-2" style={{ border: "1px solid" }}>
                    <div className="ml-2 col-6" style={{ textAlign: "left" }}>
                      Employee Code:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {taData.user.id}
                    </div>
                  </div>
                  <div className="row py-2" style={{ border: "1px solid" }}>
                    <div
                      className="ml-2 border-r"
                      style={{ textAlign: "left" }}
                    >
                      Date of Joining: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {new Date(taData.user.dateOfJoining)
                        .toISOString()
                        .substring(0, 10)}
                    </div>
                  </div>
                  <div className="row py-2" style={{ border: "1px solid" }}>
                    <div className="ml-2 col-6" style={{ textAlign: "left" }}>
                      Paylevel:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {taData.user.paylevel}
                    </div>
                  </div>
                </div>
                <div className="grid  grid-cols-3">
                  <div className="row py-2" style={{ border: "1px solid" }}>
                    <div
                      className="ml-2 border-r"
                      style={{ textAlign: "left" }}
                    >
                      Department:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {taData.user.department}
                    </div>
                  </div>
                  <div className="row py-2" style={{ border: "1px solid" }}>
                    <div
                      className="ml-2 border-r"
                      style={{ textAlign: "left" }}
                    >
                      Designation:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {taData.user.designation}
                    </div>
                  </div>
                  <div className="row py-2" style={{ border: "1px solid" }}>
                    <div
                      className="ml-2 border-r"
                      style={{ textAlign: "left" }}
                    >
                      Form filled Date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {new Date(taData.fillDate).toISOString().substring(0, 10)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4">
                  <div className="row py-2" style={{ border: "1px solid" }}>
                    <div
                      className="ml-2 border-r"
                      style={{ textAlign: "left" }}
                    >
                      Leave Details:
                    </div>
                  </div>
                  <div
                    className="col-span-3 flex flex-col py-2"
                    style={{ border: "1px solid" }}
                  >
                    <div
                      className=" py-2"
                      style={{ textAlign: "left" }}
                    >
                      <p className="ml-2">
                        FROM:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {new Date(taData.ltcInfo.fromDate)
                          .toISOString()
                          .substring(0, 10)}
                        &nbsp;&nbsp;TO:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {new Date(taData.ltcInfo.toDate)
                          .toISOString()
                          .substring(0, 10)}
                      </p>
                    </div>
                    {/* <div className="border-b border-black py-2 text-left">
                      <p className="ml-2">
                        NO. OF DAYS:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {taData.ltcInfo.earnedLeaveaAailed}
                      </p>
                    </div> */}
                    {/* <div className="ml-2  text-left">
                      <p className="font-semibold">PREFIX</p>
                      FROM:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {new Date(taData.ltcInfo.prefixFrom)
                        .toISOString()
                        .substring(0, 10)}
                      &nbsp;&nbsp;TO:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {new Date(taData.ltcInfo.prefixTo)
                        .toISOString()
                        .substring(0, 10)}
                    </div> */}
                    {/* <div className="ml-2  text-left">
                      <p className="font-semibold">SUFFIX</p>
                      FROM:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {new Date(taData.ltcInfo.sufffixFrom)
                        .toISOString()
                        .substring(0, 10)}
                      &nbsp;&nbsp;TO:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {new Date(taData.ltcInfo.suffixTo)
                        .toISOString()
                        .substring(0, 10)}
                    </div> */}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-4">
                  <div className="row py-2" style={{ border: "1px solid" }}>
                    <div className="ml-2 " style={{ textAlign: "left" }}>
                      Advance Drawn:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {taData.ltcInfo.advanceRequired === true ? "Yes" : "No"}
                    </div>
                  </div>
                  <div className="row py-2" style={{ border: "1px solid" }}>
                    <div className="ml-2 col-6" style={{ textAlign: "left" }}>
                    Advance Drawn Date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {taData.ltcInfo.advanceDrawnDate
                        ? new Date(taData.ltcInfo.advanceDrawnDate)
                            .toISOString()
                            .substring(0, 10)
                        : ""}
                    </div>
                  </div>
                  <div className="row py-2" style={{ border: "1px solid" }}>
                    <div className="ml-2" style={{ textAlign: "left" }}>
                      Bank Account No. (SBI/Any other):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{taData.accountNo ? taData.accountNo :""}
                    </div>
                  </div>
                  <div className="row py-2" style={{ border: "1px solid" }}>
                    <div className="ml-2 col-6" style={{ textAlign: "left" }}>
                      Total Fare:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {totalFare}
                    </div>
                  </div>
                </div>
                        
                  <div className="row py-2" style={{ border: "1px solid" }}>
                    <div
                      className="ml-2 border-r"
                      style={{ textAlign: "left" }}
                    >
                      Particulars of the claimant and family in respect of whom the Leave Travel Concession has been claimed::
                    </div>
                  </div>
                  <div className="col-span-3 border-b border-r border-l border-black font-small">
                  <TableTaDownload
                    readOnly={true}
                    fields={[
                      {
                        heading: "Departure Date",
                        type: "date",
                        stateKey: "departureDate",
                      },
                      {
                        heading: "From",
                        type: "text",
                        stateKey: "departureFrom",
                      },
                      {
                        heading: "Arrival Date",
                        type: "date",
                        stateKey: "arrivalDate",
                      },
                      { heading: "To", type: "text", stateKey: "arrivalTo" },
                      {
                        heading: "Distance(Kms)",
                        type: "number",
                        stateKey: "distance",
                      },
                      {
                        heading: "Travel Mode",
                        type: "text",
                        stateKey: "modeOfTravel",
                      },
                      {
                        heading: "Travel Class",
                        type: "text",
                        stateKey: "classOfTravel",
                      },
                      {
                        heading: "No. of Fares",
                        type: "number",
                        stateKey: "noOfFares",
                      },
                      {
                        heading: "Total Fare",
                        type: "number",
                        stateKey: "totalFare",
                      },
                      {
                        heading: "Ticket No.",
                        type: "text",
                        stateKey: "ticketNo",
                      },
                    ]}
                    data={journey}
                    setData={setJourney}
                  />
                  </div>
                

                <div className="flex flex-row border-l border-r border-b border-black py-4">
                &nbsp;&nbsp;I have not submitted any other claim so far for leave travel
                  Concession in respect of myself or my family members in respect of
                  the block year&nbsp;{taData.blockYear}
                </div>
                <div className="flex flex-row border-l border-r border-b border-black py-4">
                &nbsp;&nbsp;The journey has been performed by me and my spouse with Family
                  members to the declared “Home Town” / Other than Home Town viz.&nbsp;
                  {taData.OtherThanHometown}
                </div>
                <div className="flex flex-row border-l border-r border-b border-black py-4">
                &nbsp;&nbsp;Certified that my spouse for whom LTC is claimed by me is employed
                  in&nbsp;{taData.GovtOffice}
                  &nbsp;name of the Govt Office/Public Sector undertaking /Corporation /Autonomous body etc. which provides Leave
                  Travel Concession facilities but he/she has nor preferred and will
                  not claim in this behalf to his/her employer.
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            Proofs:
            <ul ref={receiptRef}></ul>
          </div>
        </div>
      </div>
    </>
  );
}
