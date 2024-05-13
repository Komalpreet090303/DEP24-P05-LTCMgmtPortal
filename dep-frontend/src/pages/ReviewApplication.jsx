// import Form from "../components/Form.jsx";
// import InputGroup from "../components/InputGroup.jsx";
// import Input from "../components/Input.jsx";
// import Table from "../components/Table.jsx";
// import { useParams } from "react-router";
// import { useRef, useState } from "react";
// import EstabSubmission from "./EstabSubmission.jsx";
// import AccountsSubmission from "./AccountsSubmission.jsx";
// import CommentBox from "../components/CommentBox.jsx";
// // import { user1 } from "../dummy/user.js";
// import { ltcInfo } from "../dummy/ltcInfos.js";
// import { useEffect } from "react";

// export default function ReviewApplication() {
//   const { id } = useParams();
//   const receiptRef = useRef(null);
//   const [ltcData, setLtcData] = useState(ltcInfo[0]);
//   const [people, setPeople] = useState(ltcData.peopleInvolved);
//   const handleInfo = (json) => {
//     setLtcData(json);
//     setPeople(json.peopleInvolved);
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
//   // console.log(ltcData)
//   const handleBlob = async (res) => {
//     console.log(res);
//     if (res.status == 200) {
//       const blob = await res.blob();
//       console.log(blob);
//       const url = window.URL.createObjectURL(blob);
//       receiptRef.current.innerHTML= "";
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
//     fetch("/api/getLTCInfo", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ ltcId: id }),
//     })
//       .then((res) => res.json())
//       .then(handleInfo);
//   }, []);

//   return (
//     <>
//       <Form onSubmit={() => false}>
//         <InputGroup>
//           <div className=" grid gap-6 mt-4 mb-2 md:grid-cols-2 xl:grid-cols-4">
//             <Input
//               readOnly
//               label={"Name"}
//               name="name"
//               type="text"
//               value={ltcData.user.firstName + " " + ltcData.user.lastName}
//             />
//             <Input
//               readOnly
//               label={"Designation"}
//               name="Designation"
//               type="text"
//               value={ltcData.user.designation}
//             />
//             <Input
//               readOnly
//               label={"Date of Joining"}
//               name="date"
//               type="date"
//               value={new Date(ltcData.user.dateOfJoining)
//                 .toISOString()
//                 .substring(0, 10)}
//             />
//             <Input
//               readOnly
//               label={"Pay Level"}
//               name="payLevel"
//               type="number"
//               value={ltcData.user.paylevel}
//             />
//           </div>
//           <h3 className="font-semibold text-l m-4 text-gray-900">
//             Leave Details
//           </h3>
//           <div className=" grid gap-6 mt-4 mb-2 md:grid-cols-2 xl:grid-cols-4">
//             <Input
//               readOnly
//               label={"Earned Leave Availed"}
//               name="earnedLeave"
//               type="number"
//               value={ltcData.earnedLeaveAvailed}
//             />
//             <Input
//               readOnly
//               label={"From"}
//               name="leaveFrom"
//               type="date"
//               value={new Date(ltcData.fromDate).toISOString().substring(0, 10)}
//             />
//             <Input
//               readOnly
//               label={"To"}
//               name="leaveTo"
//               type="date"
//               value={new Date(ltcData.toDate).toISOString().substring(0, 10)}
//             />
//           </div>

//           <h3 className="font-semibold text-l m-4 text-gray-900">
//             Prefix Details
//           </h3>
//           <div className=" grid gap-6 mt-4 mb-2 md:grid-cols-2 xl:grid-cols-4">
//             <Input
//               readOnly
//               label={"From"}
//               name="prefixFrom"
//               type="date"
//               value={
//                 ltcData.prefixFrom
//                   ? new Date(ltcData.prefixFrom).toISOString().substring(0, 10)
//                   : ""
//               }
//             />
//             <Input
//               readOnly
//               label={"To"}
//               name="prefixTo"
//               type="date"
//               value={
//                 ltcData.prefixTo
//                   ? new Date(ltcData.prefixTo).toISOString().substring(0, 10)
//                   : ""
//               }
//             />
//           </div>
//           <h3 className="font-semibold text-l m-4 text-gray-900">
//             Suffix Details
//           </h3>
//           <div className=" grid gap-6 mt-4 mb-2 md:grid-cols-2 xl:grid-cols-4">
//             <Input
//               readOnly
//               label={"From"}
//               name="suffixFrom"
//               type="date"
//               value={
//                 ltcData.suffixFrom
//                   ? new Date(ltcData.suffixFrom).toISOString().substring(0, 10)
//                   : ""
//               }
//             />
//             <Input
//               readOnly
//               label={"To"}
//               name="suffixTo"
//               type="date"
//               value={
//                 ltcData.suffixTo
//                   ? new Date(ltcData.suffixTo).toISOString().substring(0, 10)
//                   : ""
//               }
//             />
//           </div>

//           <div className="flex ml-4 justify-center space-x-10 items-center my-4"></div>

//           <div className=" grid gap-6 mt-4 mb-2 md:grid-cols-2 xl:grid-cols-4">
//             <Input
//               readOnly
//               label={"Home Town"}
//               name="homeTown"
//               type="text"
//               value={ltcData.user.hometown}
//             />
//             <Input
//               readOnly
//               label={"Nature of Visiting Place"}
//               name="visitNature"
//               type="text"
//               value={ltcData.natureOfTravel}
//             />
//             <Input
//               readOnly
//               label={"Visiting Place"}
//               name="visitPlace"
//               type="text"
//               value={ltcData.placeToVisit}
//             />
//             <Input
//               readOnly
//               label={"Total Estimated Fare"}
//               name="estimatedFare"
//               type="number"
//               value={ltcData.totalEstimatedFare}
//             />
//           </div>
//         </InputGroup>

//         <InputGroup>
//           <h3 className="font-semibold text-l m-4 text-gray-900">
//             Details of People involved in LTC
//           </h3>
//           <Table
//             readOnly={true}
//             fields={[
//               { heading: "Name", type: "text" },
//               { heading: "Age", type: "number" },
//               { heading: "Relation", type: "text" },
//               { heading: "From", type: "text", stateKey: "fromPlace" },
//               { heading: "To", type: "text", stateKey: "toPlace" },
//               { heading: "Back", type: "checkbox" },
//               {
//                 heading: "Mode Of Travel",
//                 type: "text",
//                 stateKey: "modeOfTravel",
//               },
//             ]}
//             data={people}
//             setData={setPeople}
//           />
//           <div className="flex ml-4 justify-center space-x-10 items-center my-4">
//             <span className="font-semibold text-gray-900">
//               {" "}
//               Spouse Entitled for LTC
//             </span>
//             <Input
//               className="mt-3"
//               readOnly
//               label={""}
//               name="spouseEntitled"
//               type="checkbox"
//               checked={ltcData.spouseEntitled ?? false}
//             />
//             <span className="font-semibold text-gray-900">
//               {" "}
//               Advance Required
//             </span>
//             <Input
//               className="mt-3"
//               readOnly
//               label={""}
//               name="advanceRequired"
//               type="checkbox"
//               checked={ltcData.advanceRequired}
//             />
//           </div>
//           <h3 className="font-semibold text-l m-4 text-gray-900">
//             Details for Encashment of Earned Leave
//           </h3>
//           <div className=" grid gap-6 mt-4 mb-2 md:grid-cols-2 xl:grid-cols-4">
//             <div className="flex ml-4 justify-center space-x-10 items-center my-4">
//               <span className="font-semibold text-gray-900">
//                 {" "}
//                 Encashment Required
//               </span>
//               <Input
//                 className="mt-3"
//                 readOnly
//                 label={""}
//                 name="encashment"
//                 type="checkbox"
//                 checked={ltcData.encashmentAvailed}
//               />
//             </div>
//             <Input
//               readOnly
//               label={"No. of Days"}
//               name="encashmentDays"
//               type="number"
//               value={ltcData.encashmentNoOfDays}
//             />
//           </div>
//           <p>
//             My spouse is not employed in Government service / my spouse is
//             employed in government service and the concession has not been
//             availed of by him/her separately of himself/herself or for any of
//             the family members for the block year{" "}
//           </p>
//           <div className=" grid gap-6 mt-4 mb-2 md:grid-cols-2 xl:grid-cols-4">
//           <Input
//               name="blockYear"
//               type="number"
//               value= {ltcData.blockYear}
//               readOnly
//             />
//             </div>
//           <p>
//             The information, as given above is true to the best of my knowledge
//             and belief{" "}
//             <Input
//               name="certification"
//               type="checkbox"
//               checked={true}
//               readOnly
//             />
//           </p>
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
import Table from "../components/Table.jsx";
import { useParams } from "react-router";
import { useRef, useState } from "react";
import EstabSubmission from "./EstabSubmission.jsx";
import AccountsSubmission from "./AccountsSubmission.jsx";
import CommentBox from "../components/CommentBox.jsx";
import { FaDownload } from "react-icons/fa";
// import { user1 } from "../dummy/user.js";
import { ltcInfo } from "../dummy/ltcInfos.js";
import { useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function ReviewApplication() {
  const { id } = useParams();
  const receiptRef = useRef(null);
  const [ltcData, setLtcData] = useState(ltcInfo[0]);
  const [people, setPeople] = useState(ltcData.peopleInvolved);
  const handleInfo = (json) => {
    setLtcData(json);
    setPeople(json.peopleInvolved);
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
  // console.log(ltcData)
  const handleBlob = async (res) => {
    console.log(res);
    if (res.status == 200) {
      const blob = await res.blob();
      console.log(blob);
      const url = window.URL.createObjectURL(blob);
      receiptRef.current.innerHTML = "";
      const li = document.createElement("li");
      const a = document.createElement("a");
      const textnode = document.createTextNode("Click to open in new tab file");
      a.appendChild(textnode);
      a.href = url;
      a.target = "_blank";
      li.appendChild(a);
      receiptRef.current.appendChild(li);
    }
  };

  useEffect(() => {
    fetch("/api/getLTCInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ltcId: id }),
    })
      .then((res) => res.json())
      .then(handleInfo);
  }, []);

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

        pdf.save(`${"LTC-"}.pdf`);
      });
  };
  const genPdf = () => {
    print();
  };
  return (
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
                    APPLICATION FOR LEAVE TRAVEL CONCESSION
                  </p>
                </div>
              </div>
              <div className="grid  mt-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="row py-2" style={{ border: "1px solid" }}>
                  <div
                    className="ml-2 border-r"
                    style={{ textAlign: "left" }}
                  >
                    Name of the Employee: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {ltcData.user.firstName + " " + ltcData.user.lastName}
                  </div>
                </div>
                <div className="row py-2" style={{ border: "1px solid" }}>
                  <div className="ml-2 col-6" style={{ textAlign: "left" }}>
                    Designation:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {ltcData.user.designation}
                  </div>
                </div>
                <div className="row py-2" style={{ border: "1px solid" }}>
                  <div
                    className="ml-2 border-r-1"
                    style={{ textAlign: "left" }}
                  >
                    Date of Joining: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {new Date(ltcData.user.dateOfJoining)
                      .toISOString()
                      .substring(0, 10)}
                  </div>
                </div>
                <div className="row py-2" style={{ border: "1px solid" }}>
                  <div className="ml-2 col-6" style={{ textAlign: "left" }}>
                    Paylevel:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {ltcData.user.paylevel}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4">
                <div className="row py-2" style={{ border: "1px solid" }}>
                  <div
                    className="ml-2 border-r-1"
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
                    className=" border-b border-black py-2"
                    style={{ textAlign: "left" }}
                  >
                    <p className="ml-2">
                      FROM:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {new Date(ltcData.fromDate)
                        .toISOString()
                        .substring(0, 10)}
                      &nbsp;&nbsp;TO:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {new Date(ltcData.toDate).toISOString().substring(0, 10)}
                    </p>
                  </div>
                  <div className="border-b border-black py-2 text-left">
                    <p className="ml-2">
                      NO. OF DAYS:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {ltcData.earnedLeaveAvailed}
                    </p>
                  </div>
                  <div className="ml-2  text-left">
                    <p className="font-semibold">PREFIX</p>
                    FROM:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {new Date(ltcData.prefixFrom)
                      .toISOString()
                      .substring(0, 10)}
                    &nbsp;&nbsp;TO:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {new Date(ltcData.prefixTo).toISOString().substring(0, 10)}
                  </div>
                  <div className="ml-2  text-left">
                    <p className="font-semibold">SUFFIX</p>
                    FROM:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {new Date(ltcData.suffixFrom)
                      .toISOString()
                      .substring(0, 10)}
                    &nbsp;&nbsp;TO:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {new Date(ltcData.suffixTo).toISOString().substring(0, 10)}
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-4">
                <div className="row py-2" style={{ border: "1px solid" }}>
                  <div className="ml-2 " style={{ textAlign: "left" }}>
                    Hometown: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {ltcData.user.hometown}
                  </div>
                </div>
                <div className="row py-2" style={{ border: "1px solid" }}>
                  <div className="ml-2 col-6" style={{ textAlign: "left" }}>
                    Nature of Visiting Place:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {ltcData.natureOfTravel}
                  </div>
                </div>
                <div className="row py-2" style={{ border: "1px solid" }}>
                  <div className="ml-2" style={{ textAlign: "left" }}>
                    Visiting Place: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {ltcData.placeToVisit}
                  </div>
                </div>
                <div className="row py-2" style={{ border: "1px solid" }}>
                  <div className="ml-2 col-6" style={{ textAlign: "left" }}>
                    Total Estimated Fare:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {ltcData.totalEstimatedFare}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4">
                <div className="row py-2" style={{ border: "1px solid" }}>
                  <div className="ml-2 border-r" style={{ textAlign: "left" }}>
                    Details of People involved in LTC:
                  </div>
                </div>
                <div className="col-span-3 border-b border-r border-black">
                  <Table
                    readOnly={true}
                    fields={[
                      { heading: "Name", type: "text" },
                      { heading: "Age", type: "number" },
                      { heading: "Relation", type: "text" },
                      { heading: "From", type: "text", stateKey: "fromPlace" },
                      { heading: "To", type: "text", stateKey: "toPlace" },
                      { heading: "Back", type: "checkbox" },
                      {
                        heading: "Mode Of Travel",
                        type: "text",
                        stateKey: "modeOfTravel",
                      },
                    ]}
                    data={people}
                    setData={setPeople}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-4">
                <div className="row py-2" style={{ border: "1px solid" }}>
                  <div className="ml-2 " style={{ textAlign: "left" }}>
                    Spouse Entitled for LTC: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {ltcData.spouseEntitled === true ? "Yes" : "No"}
                  </div>
                </div>
                <div className="row py-2 border-b border-r border-black">
                  <div className="ml-2 col-6" style={{ textAlign: "left" }}>
                    Advance Required:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {ltcData.advanceRequired === true ? "Yes" : "No"}
                  </div>
                </div>
                <div className="row py-2 border-b border-l border-black">
                  <div className="ml-2 " style={{ textAlign: "left" }}>
                    Encashment Required: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {ltcData.encashmentAvailed === true ? "Yes" : "No"}
                  </div>
                </div>
                <div className="row py-2 border-b border-r border-black">
                  <div className="ml-2 col-6" style={{ textAlign: "left" }}>
                    No. of Days:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {ltcData.encashmentAvailed === true
                      ? ltcData.encashmentNoOfDays
                      : "NA"}
                  </div>
                </div>
              </div>
              <div className="flex flex-row border-l border-r border-b border-black py-4">
                My spouse is not employed in Government service / my spouse is
                employed in government service and the concession has not been
                availed of by him/her separately of himself/herself or for any
                of the family members for the block year &nbsp;&nbsp;
                {ltcData.blockYear}
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
  );
}
